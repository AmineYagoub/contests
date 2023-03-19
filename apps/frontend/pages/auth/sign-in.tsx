import { Button, Divider, Form, Input } from 'antd';
import Link from 'next/link';

import {
  emailRules,
  passwordRules,
  useSigning,
} from '@/hooks/auth/signing.hook';
import AuthLayout from '@/layout/AuthLayout';
import { AppRoutes } from '@/utils/routes';
import { NextPageWithLayout } from '@/utils/types';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import styled from '@emotion/styled';
import { withAuth } from '@/components/common/withAuth';
import Head from 'next/head';
import { getTitleMeta } from '@/utils/app';
import {
  App,
  FindAppConfigDocument,
  FindAppConfigQuery,
  FindAppConfigQueryVariables,
} from '@/graphql/graphql';
import { initializeApollo } from '@/config/createGraphQLClient';

export const StyledForm = styled(Form)({
  maxWidth: 400,
  padding: '30px 50px !important',
  backgroundColor: '#fff',
  boxShadow:
    '0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)',
});

const SignInPage: NextPageWithLayout = ({ data }: { data: App }) => {
  const [form] = Form.useForm();
  const { onFinish, onFinishFailed, loading, clearErrors } = useSigning(form);

  return (
    <>
      <Head>
        <title>{getTitleMeta(data?.title, 'تسجيل الدخول')}</title>
        <meta name="description" content={data?.description} key="desc" />
      </Head>

      <StyledForm
        form={form}
        name="signing"
        layout="vertical"
        onSubmitCapture={(e) => e.preventDefault()}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={(field) => clearErrors(field, form)}
        autoComplete="off"
        size="large"
        colon
      >
        <Form.Item label="البريد الإلكتروني" name="email" rules={emailRules}>
          <Input />
        </Form.Item>

        <Form.Item label="كلمة السر" name="password" rules={passwordRules}>
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Link href={AppRoutes.ForgotPassword}>نسيت كلمة السر؟</Link>
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          تسجيل الدخول
        </Button>
        <Divider>ليس لديك حساب؟</Divider>
        <Link href={AppRoutes.SignUp}>
          <Button type="primary" ghost block loading={loading}>
            أنشئ حساب جديد
          </Button>
        </Link>
      </StyledForm>
    </>
  );
};

export async function getServerSideProps({ req, query }) {
  const client = initializeApollo({ headers: req?.headers });
  try {
    const {
      data: { findAppConfig },
    } = await client.query<FindAppConfigQuery, FindAppConfigQueryVariables>({
      query: FindAppConfigDocument,
    });

    return {
      props: {
        data: findAppConfig,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}

SignInPage.getLayout = (page: EmotionJSX.Element) => (
  <AuthLayout>{page}</AuthLayout>
);
export default withAuth(SignInPage, null, true);
