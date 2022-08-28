import { NextPageWithLayout } from '@/config/types';
import { usePaginateContestsQuery } from '@/graphql/graphql';
import HomeLayout from '@/layout/HomeLayout';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { Spin } from 'antd';
import Link from 'next/link';

const Index: NextPageWithLayout = () => {
  const { data, loading } = usePaginateContestsQuery({
    variables: {
      params: { take: 10 },
    },
  });
  return loading ? (
    <Spin />
  ) : (
    <>
      <h1>قريبا ...</h1>
      <Link href="/admin/dashboard">لوحة تحكم الادارة</Link>

      {data?.paginateContest.data.map((el) => (
        <div key={el.id}>
          <Link href={`/contests/${el.id}`}>{el.title}</Link>
        </div>
      ))}
    </>
  );
};
Index.getLayout = (page: EmotionJSX.Element) => <HomeLayout>{page}</HomeLayout>;
export default Index;
