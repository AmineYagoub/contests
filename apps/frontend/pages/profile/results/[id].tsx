import ProfileLayout from '@/layout/ProfileLayout';
import { NextPageWithLayout } from '@/config/types';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import {
  FindByIdForReviewDocument,
  FindByIdForReviewQuery,
  FindByIdForReviewQueryVariables,
} from '@/graphql/graphql';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { initializeApollo } from '@/config/createGraphQLClient';
import AnswersResult from '@/components/profile/result/AnswersResult';
import { Col, Row } from 'antd';

import dynamic from 'next/dynamic';
import { useGenerateResult } from '@/hooks/contests/generate-result.hook';

const PerformanceGauge = dynamic(
  () => import('@/components/profile/result/PerformanceGauge'),
  {
    ssr: false,
  }
);

const ContestResultPage: NextPageWithLayout = ({
  contest,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { results, gaugeValues } = useGenerateResult(contest);

  return (
    <Row>
      <Col span={6}></Col>
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
