import { notification, Spin } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { config } from '@/config/index';
import {
  PermissionTitle,
  RoleTitle,
  useGetAuthUserLazyQuery,
  User,
} from '@/graphql/graphql';
import AuthLayout from '@/layout/HomeLayout';
import { Logger } from '@/utils/app';
import { AppRoutes } from '@/utils/routes';
import { AuthActions } from '@/valtio/auth.state';

export function withAuth<P>(
  WrappedComponent: React.ComponentType<P>,
  permissions?: PermissionTitle[]
) {
  const ComponentWithPermissions = (props: P) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const [GetAuthUserQuery] = useGetAuthUserLazyQuery();

    useEffect(() => {
      const jwt = localStorage.getItem(config.jwtName);
      if (!jwt) {
        notification.error({
          message: 'لا يمكنك الوصول لهذه الصفحة!',
          description: 'يرجى تسجيل دخولك لتتمكن من الوصول لخدمات الموقع.',
        });
        router.push(AppRoutes.SignIn);
        return;
      }
      GetAuthUserQuery()
        .then(({ data }) => {
          if (!data?.getAuthUser) {
            router.push(AppRoutes.SignIn);
            return;
          }
          const user = data.getAuthUser as User;
          AuthActions.setUser(user);
          if (user.role.title === RoleTitle.Admin) {
            router.push(AppRoutes.AdminManageDashboard);
          } else {
            router.push(AppRoutes.StudentDashboard);
          }
        })
        .catch((error) => {
          router.push(AppRoutes.SignIn);
          Logger.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, []);

    return loading ? (
      <AuthLayout>
        <Spin style={{ display: 'block', margin: '5em auto' }} size="large" />
      </AuthLayout>
    ) : (
      <WrappedComponent {...props} />
    );
  };
  return ComponentWithPermissions;
}
