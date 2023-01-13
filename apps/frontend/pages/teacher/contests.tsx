import { Tabs } from 'antd';
import { useSnapshot } from 'valtio';

import {
  MembershipStatus,
  PermissionTitle,
  RoleTitle,
  Teacher,
  usePaginateAnswersQuery,
  User,
} from '@/graphql/graphql';
import { AuthState } from '@/valtio/auth.state';
import { NextPageWithLayout } from '@/utils/types';
import ProfileLayout from '@/layout/ProfileLayout';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import PremiumContest from '@/components/profile/teacher/contest/PremiumContest';
import { withAuth } from '@/components/common/withAuth';

const TeacherContests: NextPageWithLayout = () => {
  const user = useSnapshot(AuthState).user as User;

  const isPremium = user.role.title === RoleTitle.GoldenTeacher;
  /*    const isPremium =
  (user.profile as Teacher).subscription?.status === MembershipStatus.Active; */

  const { data } = usePaginateAnswersQuery({
    variables: {
      params: {
        where: {
          id: user.profile.id,
        },
      },
    },
  });

  console.log(data);

  const tabs = [
    {
      label: 'نتائج مسابقات طلابك',
      key: '2',
      children: <PremiumContest id="" isPremium={isPremium} />,
    },
  ];

  if (isPremium) {
    tabs.push({
      label: 'مسابقاتي الخاصة',
      key: '3',
      children: <PremiumContest id="" />,
    });
  }

  return <Tabs defaultActiveKey="1" type="card" size="large" items={tabs} />;
};
TeacherContests.getLayout = (page: EmotionJSX.Element) => (
  <ProfileLayout>{page}</ProfileLayout>
);
export default withAuth(TeacherContests, [
  PermissionTitle.AccessTeacherDashboard,
]);
