import AdminDashboardLayout from '@/layout/AdminDashboardLayout';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import React from 'react';

const ManageInstructors = () => {
  return (
    <div>
      <h1>قريبا ...</h1>
    </div>
  );
};

ManageInstructors.getLayout = (page: EmotionJSX.Element) => (
  <AdminDashboardLayout>{page}</AdminDashboardLayout>
);
export default ManageInstructors;
