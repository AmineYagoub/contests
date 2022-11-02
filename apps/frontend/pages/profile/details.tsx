import { Tabs } from 'antd';
import { useSnapshot } from 'valtio';

import UserDetails from '@/components/profile/user/UserDetails';
import UserDocuments from '@/components/profile/user/UserDocuments';
import UserPassword from '@/components/profile/user/UserPassword';
import { RoleTitle, User } from '@/graphql/graphql';
import ProfileLayout from '@/layout/ProfileLayout';
import { AuthState } from '@/valtio/auth.state';
import {
  ContactsOutlined,
  KeyOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

const ProfileDetails = () => {
  const user = useSnapshot(AuthState).user as User;
  const tabs = [
    {
      label: (
        <span>
          <ContactsOutlined style={{ color: 'darkcyan' }} />
          البيانات الشخصية
        </span>
      ),
      key: '1',
      children: <UserDetails user={user} />,
    },
    {
      label: (
        <span>
          <KeyOutlined style={{ color: 'darkcyan' }} />
          تغيير كلمة السر
        </span>
      ),
      key: '3',
      children: <UserPassword user={user} />,
    },
  ];
  if ([RoleTitle.Student, RoleTitle.StudentTeacher].includes(user.role.title)) {
    tabs.push({
      label: (
        <span>
          <SafetyCertificateOutlined style={{ color: 'darkcyan' }} />
          الوثائق الشخصية
        </span>
      ),
      key: '2',
      children: <UserDocuments user={user} />,
    });
  }

  return <Tabs defaultActiveKey="1" type="card" size="large" items={tabs} />;
};
ProfileDetails.getLayout = (page: EmotionJSX.Element) => (
  <ProfileLayout isTeacher={false}>{page}</ProfileLayout>
);

export default ProfileDetails;
