import { Button, Spin } from 'antd';
import Link from 'next/link';

import {
  RoleTitle,
  useGetAuthUserQuery,
  usePaginateContestsQuery,
  User,
} from '@/graphql/graphql';
import HomeLayout from '@/layout/HomeLayout';
import { NextPageWithLayout } from '@/utils/types';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { AppRoutes } from '@/utils/routes';

const logout = () => {
  localStorage.clear();
};

const Index: NextPageWithLayout = (props) => {
  const { data: d, loading: l } = useGetAuthUserQuery();
  const { data, loading } = usePaginateContestsQuery({
    variables: {
      params: { take: 10 },
    },
  });
  return loading || l ? (
    <Spin />
  ) : (
    <>
      <h1>قريبا ...</h1>

      <div>
        <Link href="/admin/dashboard">لوحة تحكم الادارة</Link>
      </div>

      {d?.getAuthUser?.role.title.includes(RoleTitle.Teacher) && (
        <Link href="/teacher/dashboard">صفحتي الشخصية</Link>
      )}
      {d?.getAuthUser?.role.title.includes(RoleTitle.Student) && (
        <Link href="/profile/dashboard">صفحتي الشخصية</Link>
      )}

      {data?.paginateContest?.data.map((el) => (
        <div key={el.id}>
          <Link href={`/profile/contests/${el.id}`}>{el.title}</Link>
        </div>
      ))}
      {d?.getAuthUser && (
        <Button onClick={logout} type="link" href={AppRoutes.SignIn}>
          تسجيل الخروج
        </Button>
      )}
    </>
  );
};
Index.getLayout = (page: EmotionJSX.Element) => <HomeLayout>{page}</HomeLayout>;
export default Index;
