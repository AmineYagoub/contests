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
  PermissionTitle,
} from '@/graphql/graphql';
import { useGenerateResult } from '@/hooks/contests/result.hook';
import ProfileLayout from '@/layout/ProfileLayout';
import { NextPageWithLayout } from '@/utils/types';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { withAuth } from '@/components/common/withAuth';

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
export default withAuth(ContestResultPage, [
  PermissionTitle.AccessStudentDashboard,
]);

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
