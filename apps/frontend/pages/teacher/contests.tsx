import { Tabs } from 'antd';
import { useSnapshot } from 'valtio';
import { AuthState } from '@/valtio/auth.state';
import { NextPageWithLayout } from '@/utils/types';
import ProfileLayout from '@/layout/ProfileLayout';
import { withAuth } from '@/components/common/withAuth';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { PermissionTitle, RoleTitle, User } from '@/graphql/graphql';
import PremiumContest from '@/components/profile/teacher/contest/PremiumContest';
import StudentsAnswers from '@/components/profile/teacher/contest/StudentsAnswers';
import Head from 'next/head';
import { getTitleMeta } from '@/utils/app';

const TeacherContests: NextPageWithLayout = () => {
  const user = useSnapshot(AuthState).user as User;

  const isPremium = user.role.title === RoleTitle.GoldenTeacher;
  /*    const isPremium =
  (user.profile as Teacher).subscription?.status === MembershipStatus.Active; */

  const tabs = [
    {
      label: 'نتائج مسابقات طلابك',
      key: '2',
      children: <StudentsAnswers id={user.profile.id} />,
    },
  ];

  if (isPremium) {
    tabs.push({
      label: 'مسابقاتي الخاصة',
      key: '3',
      children: <PremiumContest id={user.id} />,
    });
  }

  return (
    <>
      <Head>
        <title>{getTitleMeta('ألمبياد النحو العربي', 'المسابقات')}</title>
      </Head>
      <Tabs defaultActiveKey="1" type="card" size="large" items={tabs} />;
    </>
  );
};
TeacherContests.getLayout = (page: EmotionJSX.Element) => (
  <ProfileLayout>{page}</ProfileLayout>
);
export default withAuth(TeacherContests, [
  PermissionTitle.AccessTeacherDashboard,
]);
