import { notification, Spin } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { config } from '@/config/index';
import {
  PermissionTitle,
  useGetAuthUserLazyQuery,
  User,
} from '@/graphql/graphql';
import AuthLayout from '@/layout/AuthLayout';
import { Logger } from '@/utils/app';
import { AppRoutes, redirect } from '@/utils/routes';
import { AuthActions, AuthState } from '@/valtio/auth.state';
import { useSnapshot } from 'valtio';
import { NextPageWithLayout } from '@/utils/types';

export function withAuth<P>(
  WrappedComponent: NextPageWithLayout,
  permissions?: PermissionTitle[],
  isPublic = false
) {
  const ComponentWithPermissions = (props: P) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const [GetAuthUserQuery] = useGetAuthUserLazyQuery();
    const user = useSnapshot(AuthState).user as User;

    useEffect(() => {
      const jwt = localStorage.getItem(config.jwtName);
      if (!jwt && !isPublic) {
        notification.error({
          message: 'لا يمكنك الوصول لهذه الصفحة!',
          description: 'يرجى تسجيل دخولك لتتمكن من الوصول لخدمات الموقع.',
        });
        router.push(AppRoutes.SignIn);
        return;
      }

      if (router.asPath === AppRoutes.SignIn && jwt) {
        if (user) {
          redirect(router, user.role.title);
        } else {
          GetAuthUserQuery()
            .then(({ data }) => {
              const u = data.getAuthUser as User;
              AuthActions.setUser(u);
              redirect(router, u.role.title);
            })
            .catch((error) => {
              // logout();
              Logger.log(error);
            })
            .finally(() => {
              setLoading(false);
            });
        }
      }

      if (isPublic) {
        setLoading(false);
        return;
      }

      if (jwt && !user) {
        GetAuthUserQuery()
          .then(({ data }) => {
            const u = data.getAuthUser as User;
            AuthActions.setUser(u);
          })
          .catch((error) => {
            //logout();
            Logger.log(error);
          })
          .finally(() => {
            setLoading(false);
          });
      }

      if (
        permissions &&
        user &&
        !user.role.permissions.some((el) => permissions.includes(el.title))
      ) {
        notification.warning({
          message: 'لا يمكنك الوصول لهذه الصفحة!',
          description: 'لا تمتلك الصلاحيات الكافية للوصول لهذه الصفحة.',
        });
        router.push('/');
        return;
      }
      setLoading(false);
    }, [GetAuthUserQuery, router, user]);

    const getLayout = WrappedComponent.getLayout;
    return loading ? (
      <AuthLayout>
        <Spin style={{ display: 'block', margin: '5em auto' }} size="large" />
      </AuthLayout>
    ) : (
      getLayout(<WrappedComponent {...props} />)
    );
  };
  return ComponentWithPermissions;
}
