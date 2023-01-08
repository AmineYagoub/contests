import { withAuth } from '@/components/common/withAuth';
import MessageBox from '@/components/messages/MessageBox';
import { PermissionTitle, RoleTitle } from '@/graphql/graphql';
import AdminLayout from '@/layout/AdminLayout';
import { getTitleMeta } from '@/utils/app';
import { AuthState } from '@/valtio/auth.state';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import Head from 'next/head';
import { useSnapshot } from 'valtio';

const ManageMessages = () => {
  const userSnap = useSnapshot(AuthState).user;
  return (
    <>
      <Head>
        <title>{getTitleMeta('لوحة التحكم', 'الرسائل')}</title>
      </Head>
      <MessageBox
        role={RoleTitle.Admin}
        id={userSnap.id}
        avatar={userSnap.profile.personalImage}
      />
    </>
  );
};

ManageMessages.getLayout = (page: EmotionJSX.Element) => (
  <AdminLayout>{page}</AdminLayout>
);

export default withAuth(ManageMessages, [PermissionTitle.AccessDashboard]);
