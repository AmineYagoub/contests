import { NextPageWithLayout } from '@/config/types';
import HomeLayout from '@/layout/HomeLayout';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import Link from 'next/link';

const Index: NextPageWithLayout = () => {
  return (
    <>
      <h1>قريبا ...</h1>
      <Link href="/admin/dashboard">لوحة تحكم الادارة</Link>
    </>
  );
};
Index.getLayout = (page: EmotionJSX.Element) => <HomeLayout>{page}</HomeLayout>;
export default Index;
