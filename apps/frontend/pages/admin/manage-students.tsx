import AdminLayout from '@/layout/AdminLayout';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

const ManageStudents = () => {
  return (
    <div>
      <h1>قريبا ...</h1>
    </div>
  );
};

ManageStudents.getLayout = (page: EmotionJSX.Element) => (
  <AdminLayout>{page}</AdminLayout>
);
export default ManageStudents;
