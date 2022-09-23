import { Spin } from 'antd';
import Link from 'next/link';

import { usePaginateContestsQuery } from '@/graphql/graphql';
import HomeLayout from '@/layout/HomeLayout';
import { NextPageWithLayout } from '@/utils/types';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

const Index: NextPageWithLayout = (props) => {
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

      {data?.paginateContest?.data.map((el) => (
        <div key={el.id}>
          <Link href={`/profile/contests/${el.id}`}>{el.title}</Link>
        </div>
      ))}
    </>
  );
};
Index.getLayout = (page: EmotionJSX.Element) => <HomeLayout>{page}</HomeLayout>;
export default Index;
