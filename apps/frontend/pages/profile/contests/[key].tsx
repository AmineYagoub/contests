import ContestStarter from '@/components/contest/ContestStarter';
import { withAuth } from '@/components/common/withAuth';
import ContestLayout from '@/layout/ContestLayout';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import {
  Contest,
  FindByIdForExamDocument,
  FindByIdForExamQuery,
  FindByIdForExamQueryVariables,
  PermissionTitle,
  Student,
} from '@/graphql/graphql';
import { initializeApollo } from '@/config/createGraphQLClient';
import { getContestSoonRoute } from '@/utils/routes';
import { ContestActions } from '@/valtio/contest.state';
import { useSnapshot } from 'valtio';
import { AuthState } from '@/valtio/auth.state';
import Head from 'next/head';
import { getTitleMeta } from '@/utils/app';

const StartContestPage = ({ contest }: { contest: Contest }) => {
  const user = useSnapshot(AuthState).user;
  ContestActions.setContest(contest);
  const isAllowed =
    !contest.answers.some((el) => el.userId.id === user.id) &&
    contest.participants.includes(user.id);
  return (
    <>
      <Head>
        <title>{getTitleMeta('ألمبياد النحو العربي', contest.title)}</title>
      </Head>
      <ContestStarter
        contestId={contest.id}
        userId={user.id}
        teacherId={(user.profile as Student).teacher?.id}
        teacherProfileId={(user.profile as Student).teacher?.userId}
        isAllowed={isAllowed}
      />
    </>
  );
};

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

    const now = Date.now();
    const time = new Date(findOneContestById.startTime);
    if (now < time.getTime()) {
      return {
        redirect: {
          destination: getContestSoonRoute(
            findOneContestById.startTime,
            findOneContestById.title,
            String(query.key)
          ),
          permanent: false,
        },
      };
    }
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
