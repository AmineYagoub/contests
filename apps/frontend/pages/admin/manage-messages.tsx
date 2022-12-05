import { withAuth } from '@/components/common/withAuth';
import { PermissionTitle } from '@/graphql/graphql';
import AdminLayout from '@/layout/AdminLayout';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

const ManageMessages = () => {
  return (
    <div>
      <h1>قريبا ...</h1>
    </div>
  );
};

ManageMessages.getLayout = (page: EmotionJSX.Element) => (
  <AdminLayout>{page}</AdminLayout>
);

export default withAuth(ManageMessages, [PermissionTitle.AccessDashboard]);
