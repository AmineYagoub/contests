import { useRouter } from 'next/router';

import ContestStarter from '@/components/contest/ContestStarter';

import { withAuth } from '@/components/common/withAuth';
import ContestLayout from '@/layout/ContestLayout';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { NextPageWithLayout } from '@/utils/types';
import {
  FindByIdForExamDocument,
  FindByIdForExamQuery,
  FindByIdForExamQueryVariables,
  PermissionTitle,
} from '@/graphql/graphql';
import { initializeApollo } from '@/config/createGraphQLClient';

const StartContestPage: NextPageWithLayout = () => {
  const router = useRouter();
  return <ContestStarter contestId={String(router.query.key)} />;
};

// profile/contests/coming-soon?time=hdhdh

export async function getServerSideProps({ req, query }) {
  if (!query.key) {
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
    } = await client.query<FindByIdForExamQuery, FindByIdForExamQueryVariables>(
      {
        query: FindByIdForExamDocument,
        variables: {
          id: String(query.key),
        },
      }
    );

    return {
      props: {
        contest: findOneContestById,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}

StartContestPage.getLayout = (page: EmotionJSX.Element) => (
  <ContestLayout>{page}</ContestLayout>
);
export default withAuth(StartContestPage, [
  PermissionTitle.AccessStudentDashboard,
]);
