import { Tabs } from 'antd';
import { useSnapshot } from 'valtio';

import FinishedContest from '@/components/profile/student/contest/FinishedContest';
import UpcomingContest from '@/components/profile/student/contest/UpcomingContest';
import { PermissionTitle } from '@/graphql/graphql';
import ProfileLayout from '@/layout/ProfileLayout';
import { AuthState } from '@/valtio/auth.state';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { withAuth } from '@/components/common/withAuth';
import { NextPageWithLayout } from '@/utils/types';
import Head from 'next/head';
import { getTitleMeta } from '@/utils/app';

const ProfileContests: NextPageWithLayout = () => {
  const userSnap = useSnapshot(AuthState).user;
  const tabs = [
    {
      label: 'المسابقات التي أجريتها',
      key: '1',
      children: <FinishedContest id={userSnap?.id} isCompleted />,
    },
    {
      label: 'المسابقات المتاحة',
      key: '2',
      children: <UpcomingContest id={userSnap?.id} />,
    },
  ];

  return (
    <>
      <Head>
        <title>{getTitleMeta('ألمبياد النحو العربي', 'المسابقات')}</title>
      </Head>
      <Tabs defaultActiveKey="1" type="card" size="large" items={tabs} />;
    </>
  );
};
ProfileContests.getLayout = (page: EmotionJSX.Element) => (
  <ProfileLayout>{page}</ProfileLayout>
);
export default withAuth(ProfileContests, [
  PermissionTitle.AccessStudentDashboard,
]);
