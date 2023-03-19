import { Button, Form, Input, notification } from 'antd';
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
import {
  UpdatePasswordValues,
  useUpdatePassword,
} from '@/hooks/auth/password.hook';
import { confirmPasswordRules, passwordRules } from '@/hooks/auth/signup.hook';
import AuthLayout from '@/layout/AuthLayout';
import { Logger } from '@/utils/app';
import { AppRoutes } from '@/utils/routes';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

import { StyledForm } from '../sign-in';
import { withAuth } from '@/components/common/withAuth';

const RecoverPassword = ({
  succeed,
  id,
}: {
  succeed: boolean;
  id?: string;
}) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { loading, onFinish, onFinishFailed, user } = useUpdatePassword();

  useEffect(() => {
    if (!succeed) {
      notification.error({
        message: 'فشل في الطلب',
        description: 'رمز تفعيل حسابك غير صالح.',
      });
      router.push(AppRoutes.SignIn);
    }
  }, []);

  useEffect(() => {
    if (user) {
      notification.success({
        message: 'تم تغيير كلمة السر بنجاح.',
        description: 'يرجى تسجيل الدخول بكلمة السر الجديدة.',
      });
      router.push(AppRoutes.SignIn);
    }
  }, [user]);

  return (
    <StyledForm
      form={form}
      name="recover"
      layout="vertical"
      onSubmitCapture={(e) => e.preventDefault()}
      onFinish={(values: UpdatePasswordValues) => onFinish({ ...values, id })}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      size="large"
      colon
    >
      <h1>إعادة ضبط كلمة السر الجديدة</h1>

      <Form.Item
        label="كلمة السر الجديدة"
        name="password"
        rules={passwordRules}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="إعادة كلمة السر الجديدة"
        name="confirmPassword"
        dependencies={['password']}
        rules={confirmPasswordRules}
      >
        <Input.Password />
      </Form.Item>

      <Button type="primary" htmlType="submit" block loading={loading}>
        تغيير كلمة السر
      </Button>
    </StyledForm>
  );
};

RecoverPassword.getLayout = (page: EmotionJSX.Element) => (
  <AuthLayout>{page}</AuthLayout>
);
export default withAuth(RecoverPassword, null, true);
export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  if (query.recover?.length < 2) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const [id, token] = query.recover;
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
          input: { id },
        },
      });
      return {
        props: {
          succeed: !!activateEmailToken?.id,
          id: activateEmailToken?.id,
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
