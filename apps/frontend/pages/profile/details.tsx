import { Tabs } from 'antd';
import { useSnapshot } from 'valtio';

import UserDetails from '@/components/profile/user/UserDetails';
import UserDocuments from '@/components/profile/user/UserDocuments';
import UserPassword from '@/components/profile/user/UserPassword';
import { User } from '@/graphql/graphql';
import ProfileLayout from '@/layout/ProfileLayout';
import { AuthState } from '@/valtio/auth.state';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

const ProfileDetails = () => {
  const userSnap = useSnapshot(AuthState);
  const tabs = [
    {
      label: 'البيانات الشخصية',
      key: '1',
      children: <UserDetails user={userSnap.user as User} />,
    },
    {
      label: 'الوثائق الشخصية',
      key: '2',
      children: <UserDocuments user={userSnap.user as User} />,
    },
    {
      label: 'تغيير كلمة السر',
      key: '3',
      children: <UserPassword user={userSnap.user as User} />,
    },
  ];

  return <Tabs defaultActiveKey="1" type="card" size="large" items={tabs} />;
};
ProfileDetails.getLayout = (page: EmotionJSX.Element) => (
  <ProfileLayout>{page}</ProfileLayout>
);

export default ProfileDetails;
