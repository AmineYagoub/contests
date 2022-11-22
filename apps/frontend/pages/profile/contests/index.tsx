import { Tabs } from 'antd';
import { useSnapshot } from 'valtio';

import FinishedContest from '@/components/profile/student/contest/FinishedContest';
import UpcomingContest from '@/components/profile/student/contest/UpcomingContest';
import { User } from '@/graphql/graphql';
import ProfileLayout from '@/layout/ProfileLayout';
import { AuthState } from '@/valtio/auth.state';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

const ProfileContests = () => {
  const userSnap = useSnapshot(AuthState);
  const tabs = [
    {
      label: 'المسابقات المنتهية',
      key: '1',
      children: <FinishedContest user={userSnap.user as User} />,
    },
    {
      label: 'المسابقات القادمة',
      key: '2',
      children: <UpcomingContest user={userSnap.user as User} />,
    },
  ];

  return <Tabs defaultActiveKey="1" type="card" size="large" items={tabs} />;
};
ProfileContests.getLayout = (page: EmotionJSX.Element) => (
  <ProfileLayout isTeacher={false}>{page}</ProfileLayout>
);
export default ProfileContests;
