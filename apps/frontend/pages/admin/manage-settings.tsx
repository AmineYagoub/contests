import AdminDashboardLayout from '@/layout/AdminDashboardLayout';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

const ManageSettings = () => {
  return (
    <div>
      <h1>قريبا ...</h1>
    </div>
  );
};

ManageSettings.getLayout = (page: EmotionJSX.Element) => (
  <AdminDashboardLayout>{page}</AdminDashboardLayout>
);
export default ManageSettings;
