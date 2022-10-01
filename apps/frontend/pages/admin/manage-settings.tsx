import AdminLayout from '@/layout/AdminLayout';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

const ManageSettings = () => {
  return (
    <div>
      <h1>قريبا ...</h1>
    </div>
  );
};

ManageSettings.getLayout = (page: EmotionJSX.Element) => (
  <AdminLayout>{page}</AdminLayout>
);
export default ManageSettings;
