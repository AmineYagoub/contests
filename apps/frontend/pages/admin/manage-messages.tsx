import AdminDashboardLayout from '@/layout/AdminDashboardLayout';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

const ManageMessages = () => {
  return (
    <div>
      <h1>قريبا ...</h1>
    </div>
  );
};

ManageMessages.getLayout = (page: EmotionJSX.Element) => (
  <AdminDashboardLayout>{page}</AdminDashboardLayout>
);
export default ManageMessages;
