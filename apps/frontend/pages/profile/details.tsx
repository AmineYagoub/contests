import { Tabs } from 'antd';
import { useSnapshot } from 'valtio';

import UserPassword from '@/components/profile/common/UserPassword';
import { PermissionTitle, RoleTitle, User } from '@/graphql/graphql';
import ProfileLayout from '@/layout/ProfileLayout';
import { AuthState } from '@/valtio/auth.state';
import {
  ContactsOutlined,
  KeyOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { withAuth } from '@/components/common/withAuth';

import dynamic from 'next/dynamic';
import Head from 'next/head';
import { getTitleMeta } from '@/utils/app';
import Loading from '@/components/common/Loading';

const UserDocuments = dynamic(
  import('@/components/profile/student/documents/UserDocuments'),
  { ssr: false }
);
const UserDetails = dynamic(import('@/components/profile/common/UserDetails'), {
  ssr: false,
});

export const ProfileDetails = () => {
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
      children: user ? <UserDetails user={user} /> : <Loading />,
    },
    {
      label: (
        <span>
          <KeyOutlined style={{ color: 'darkcyan' }} />
          تغيير كلمة السر
        </span>
      ),
      key: '3',
      children: user ? <UserPassword user={user} /> : <Loading />,
    },
  ];
  if (
    [RoleTitle.Student, RoleTitle.StudentTeacher].includes(user?.role.title)
  ) {
    tabs.push({
      label: (
        <span>
          <SafetyCertificateOutlined style={{ color: 'darkcyan' }} />
          الوثائق الشخصية
        </span>
      ),
      key: '2',
      children: user ? <UserDocuments user={user} /> : <Loading />,
    });
  }

  return (
    <>
      <Head>
        <title>{getTitleMeta('ألمبياد النحو العربي', 'الملف الشخصي')}</title>
      </Head>
      <Tabs defaultActiveKey="1" type="card" size="large" items={tabs} />
    </>
  );
};
ProfileDetails.getLayout = (page: EmotionJSX.Element) => (
  <ProfileLayout>{page}</ProfileLayout>
);

export default withAuth(ProfileDetails, [
  PermissionTitle.AccessStudentDashboard,
]);
