import AdminDashboardLayout from '@/layout/AdminDashboardLayout';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

const ManageStudents = () => {
  return (
    <div>
      <h1>قريبا ...</h1>
    </div>
  );
};

ManageStudents.getLayout = (page: EmotionJSX.Element) => (
  <AdminDashboardLayout>{page}</AdminDashboardLayout>
);
export default ManageStudents;
