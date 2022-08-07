import AdminDashboardLayout from '@/layout/AdminDashboardLayout';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

const ManageContests = () => {
  return (
    <div>
      <h1>قريبا ...</h1>
    </div>
  );
};

ManageContests.getLayout = (page: EmotionJSX.Element) => (
  <AdminDashboardLayout>{page}</AdminDashboardLayout>
);
export default ManageContests;
