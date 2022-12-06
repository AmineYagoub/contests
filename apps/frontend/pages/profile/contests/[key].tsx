import { useRouter } from 'next/router';

import ContestStarter from '@/components/contest/ContestStarter';

import { withAuth } from '@/components/common/withAuth';
import ContestLayout from '@/layout/ContestLayout';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { NextPageWithLayout } from '@/utils/types';
import { PermissionTitle } from '@/graphql/graphql';

const StartContestPage: NextPageWithLayout = () => {
  const router = useRouter();
  return <ContestStarter contestId={String(router.query.key)} />;
};

StartContestPage.getLayout = (page: EmotionJSX.Element) => (
  <ContestLayout>{page}</ContestLayout>
);
export default withAuth(StartContestPage, [
  PermissionTitle.AccessStudentDashboard,
]);
