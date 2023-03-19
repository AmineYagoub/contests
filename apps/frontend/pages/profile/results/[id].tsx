import { Col, Row } from 'antd';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';

import AnswersResult from '@/components/profile/student/result/AnswersResult';
import TotalResultDetails from '@/components/profile/student/result/TotalResultDetails';
import { initializeApollo } from '@/config/createGraphQLClient';
import {
  FindByIdForReviewDocument,
  FindByIdForReviewQuery,
  FindByIdForReviewQueryVariables,
} from '@/graphql/graphql';
import { useGenerateResult } from '@/hooks/contests/result.hook';
import ProfileLayout from '@/layout/ProfileLayout';
import { NextPageWithLayout } from '@/utils/types';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { withAuth } from '@/components/common/withAuth';
import Head from 'next/head';
import { getTitleMeta } from '@/utils/app';

const PerformanceGauge = dynamic(
  () => import('@/components/profile/student/result/PerformanceGauge'),
  {
    ssr: false,
  }
);

const ContestResultPage: NextPageWithLayout = ({
  contest,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { results, gaugeValues, contestMeta } = useGenerateResult(contest);

  return (
    <>
      <Head>
        <title>{getTitleMeta('ألمبياد النحو العربي', 'نتيجة المسابقة')}</title>
      </Head>
      <Row>
        <Col span={6}>
          <TotalResultDetails contestMeta={contestMeta} />
        </Col>
        <Col span={18}>
          <PerformanceGauge values={gaugeValues} />
          <AnswersResult
            results={results.filter((el) => !!el.options.length)}
          />
        </Col>
      </Row>
    </>
  );
};
ContestResultPage.getLayout = (page: EmotionJSX.Element) => (
  <ProfileLayout>{page}</ProfileLayout>
);
export default withAuth(ContestResultPage);

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
    return {
      notFound: true,
    };
  }
};
