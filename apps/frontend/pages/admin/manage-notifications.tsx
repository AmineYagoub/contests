import AdminDashboardLayout from '@/layout/AdminDashboardLayout';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

const ManageNotifications = () => {
  return (
    <div>
      <h1>قريبا ...</h1>
    </div>
  );
};

ManageNotifications.getLayout = (page: EmotionJSX.Element) => (
  <AdminDashboardLayout>{page}</AdminDashboardLayout>
);
export default ManageNotifications;
