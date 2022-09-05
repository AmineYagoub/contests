import { Col, Row } from 'antd';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';

import AnswersResult from '@/components/profile/result/AnswersResult';
import TotalResultDetails from '@/components/profile/result/TotalResultDetails';
import { initializeApollo } from '@/config/createGraphQLClient';
import { NextPageWithLayout } from '@/config/types';
import {
  FindByIdForReviewDocument,
  FindByIdForReviewQuery,
  FindByIdForReviewQueryVariables,
} from '@/graphql/graphql';
import { useGenerateResult } from '@/hooks/contests/generate-result.hook';
import ProfileLayout from '@/layout/ProfileLayout';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

const PerformanceGauge = dynamic(
  () => import('@/components/profile/result/PerformanceGauge'),
  {
    ssr: false,
  }
);

const ContestResultPage: NextPageWithLayout = ({
  contest,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { results, gaugeValues, contestMeta } = useGenerateResult(contest);

  return (
    <Row>
      <Col span={6}>
        <TotalResultDetails contestMeta={contestMeta} />
      </Col>
      <Col span={14}>
        <PerformanceGauge values={gaugeValues} />
        <AnswersResult results={results} />
      </Col>
    </Row>
  );
};
ContestResultPage.getLayout = (page: EmotionJSX.Element) => (
  <ProfileLayout>{page}</ProfileLayout>
);
export default ContestResultPage;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  if (!query.id || !query.cid) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const client = initializeApollo({ headers: req?.headers });

  try {
    const {
      data: { findOneContestById },
    } = await client.query<
      FindByIdForReviewQuery,
      FindByIdForReviewQueryVariables
    >({
      query: FindByIdForReviewDocument,
      variables: {
        id: String(query.cid),
        answerId: String(query.id),
      },
    });
    return findOneContestById
      ? {
          props: {
            contest: findOneContestById,
          },
        }
      : {
          notFound: true,
        };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
