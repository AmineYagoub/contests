import { withAuth } from '@/components/common/withAuth';
import { PermissionTitle } from '@/graphql/graphql';
import AdminLayout from '@/layout/AdminLayout';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

const ManageNotifications = () => {
  return (
    <div>
      <h1>قريبا ...</h1>
    </div>
  );
};

ManageNotifications.getLayout = (page: EmotionJSX.Element) => (
  <AdminLayout>{page}</AdminLayout>
);

export default withAuth(ManageNotifications, [PermissionTitle.AccessDashboard]);
