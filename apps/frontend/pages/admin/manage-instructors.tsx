import AdminLayout from '@/layout/AdminLayout';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

const ManageInstructors = () => {
  return (
    <div>
      <h1>قريبا ...</h1>
    </div>
  );
};

ManageInstructors.getLayout = (page: EmotionJSX.Element) => (
  <AdminLayout>{page}</AdminLayout>
);
export default ManageInstructors;
