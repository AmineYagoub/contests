import { Button, Form, Input, Result } from 'antd';
import { AnimatePresence } from 'framer-motion';

import { useRequestUpdatePassword } from '@/hooks/auth/password.hook';
import { emailRules } from '@/hooks/auth/signup.hook';
import AuthLayout from '@/layout/AuthLayout';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

import { formLayout, StyledForm } from '../sign-up';
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

const ForgotPassword = ({ data }: { data: App }) => {
  const [form] = Form.useForm();
  const { isSuccess, loading, onFinish, onFinishFailed } =
    useRequestUpdatePassword();
  return (
    <>
      <Head>
        <title>{getTitleMeta(data?.title, 'إستعادة كلمة السر')}</title>
        <meta name="description" content={data?.description} key="desc" />
      </Head>

      <AnimatePresence initial={false} mode="wait">
        {isSuccess ? (
          <Result
            status="success"
            title="قم بتأكيد ملكية حسابك!"
            subTitle="تم إرسال تعليمات لبريدك الإلكتروني حول إعادة تعيين كلمة السر الخاصة بك."
          />
        ) : (
          <StyledForm
            form={form}
            name="signUp"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            size="large"
            {...formLayout}
          >
            <h1>إعادة ضبط كلمة المرور</h1>
            <strong>
              أدخل بريدك الإلكتروني و سيتم إرسال رسالة إلكترونية إليك. في حالة
              عدم تلقِّي رسالة إلكترونية:
            </strong>

            <ul style={{ marginBottom: 30 }}>
              <li>
                راجِع مجلدي &#39;الرسائل غير المرغوب فيها&#39; أو &#39;البريد
                المجمّع&#39;.
              </li>
              <li>
                تحقق من جميع عناوين البريد الإلكتروني التي من المحتمل أنك
                استخدمتها للاشتراك أو لتسجيل الدخول إلى حسابك.
              </li>
            </ul>
            <Form.Item
              label="البريد الإلكتروني"
              name="email"
              rules={emailRules}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item wrapperCol={{ ...formLayout.wrapperCol, offset: 5 }}>
              <Button type="primary" htmlType="submit" block loading={loading}>
                إستعادة كلمة السر
              </Button>
            </Form.Item>
          </StyledForm>
        )}
      </AnimatePresence>
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

ForgotPassword.getLayout = (page: EmotionJSX.Element) => (
  <AuthLayout>{page}</AuthLayout>
);
export default withAuth(ForgotPassword, null, true);
