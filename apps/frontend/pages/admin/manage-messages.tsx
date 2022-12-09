import { withAuth } from '@/components/common/withAuth';
import MessageBox from '@/components/messages/MessageBox';
import { PermissionTitle, RoleTitle } from '@/graphql/graphql';
import AdminLayout from '@/layout/AdminLayout';
import { AuthState } from '@/valtio/auth.state';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { useSnapshot } from 'valtio';

const ManageMessages = () => {
  const userSnap = useSnapshot(AuthState).user;
  return (
    <MessageBox
      role={RoleTitle.Admin}
      id={userSnap.id}
      avatar={userSnap.profile.personalImage}
    />
  );
};

ManageMessages.getLayout = (page: EmotionJSX.Element) => (
  <AdminLayout>{page}</AdminLayout>
);

export default withAuth(ManageMessages, [PermissionTitle.AccessDashboard]);
