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
export default ManageMessages;
