import { notification, Spin } from 'antd';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { initializeApollo } from '@/config/createGraphQLClient';
import {
  ActivateEmailTokenDocument,
  ActivateEmailTokenMutation,
  ActivateEmailTokenMutationVariables,
  FindEmailTokenDocument,
  FindEmailTokenQuery,
  FindEmailTokenQueryVariables,
} from '@/graphql/graphql';
import AuthLayout from '@/layout/AuthLayout';
import { Logger } from '@/utils/app';
import { AppRoutes } from '@/utils/routes';
import { NextPageWithLayout } from '@/utils/types';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

const VerifyEmail: NextPageWithLayout = ({ succeed }: { succeed: boolean }) => {
  const router = useRouter();
  useEffect(() => {
    if (succeed) {
      notification.success({
        message: 'حسابك أصبح مفعل',
        description: 'تم تفعيل حسابك بنجاح, يرجى تسجيل الدخول.',
      });
      router.push(AppRoutes.SignIn);
    } else {
      notification.error({
        message: 'فشل في الطلب',
        description: 'رمز تفعيل حسابك غير صالح.',
      });
      router.push(AppRoutes.Home);
    }
  }, []);

  return (
    <div style={{ margin: '100px 0', textAlign: 'center' }}>
      <Spin />
    </div>
  );
};

VerifyEmail.getLayout = (page: EmotionJSX.Element) => (
  <AuthLayout>{page}</AuthLayout>
);

export default VerifyEmail;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  if (query.verify?.length < 2) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const [id, token] = query.verify;
  const client = initializeApollo({ headers: req?.headers });

  try {
    const {
      data: { findEmailToken },
    } = await client.query<FindEmailTokenQuery, FindEmailTokenQueryVariables>({
      query: FindEmailTokenDocument,
      variables: {
        token,
      },
    });
    if (findEmailToken && findEmailToken.user.id === id) {
      const {
        data: { activateEmailToken },
      } = await client.mutate<
        ActivateEmailTokenMutation,
        ActivateEmailTokenMutationVariables
      >({
        mutation: ActivateEmailTokenDocument,
        variables: {
          userId: id,
        },
      });
      return {
        props: {
          succeed: !!activateEmailToken?.id,
        },
      };
    }
    return {
      props: {
        succeed: false,
      },
    };
  } catch (error) {
    Logger.log(error);
    return {
      notFound: true,
    };
  }
};
