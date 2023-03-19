import {
  useSignUp,
  emailRules,
  passwordRules,
  confirmPasswordRules,
} from '@/hooks/auth/signup.hook';
import Link from 'next/link';
import styled from '@emotion/styled';
import { AppRoutes } from '@/utils/routes';
import AuthLayout from '@/layout/AuthLayout';
import { NextPageWithLayout } from '@/utils/types';
import { withAuth } from '@/components/common/withAuth';
import SelectRole from '@/components/common/SelectRole';
import VerifyAccount from '@/components/auth/VerifyAccount';
import { Button, Checkbox, Divider, Form, Input } from 'antd';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { initializeApollo } from '@/config/createGraphQLClient';
import {
  App,
  FindAppConfigDocument,
  FindAppConfigQuery,
  FindAppConfigQueryVariables,
} from '@/graphql/graphql';
import Head from 'next/head';
import { getTitleMeta } from '@/utils/app';

export const formLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 },
};

export const StyledForm = styled(Form)({
  maxWidth: 680,
  padding: '40px 25px !important',
  backgroundColor: '#fff',
  boxShadow:
    '0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)',
});

const Space = styled('span')({
  display: 'inline-block',
  width: '24px',
  lineHeight: '32px',
  textAlign: 'center',
});

const SignUpPage: NextPageWithLayout = ({ data }: { data: App }) => {
  const [form] = Form.useForm();
  const {
    onFinish,
    onFinishFailed,
    loading,
    selectedSupervisor,
    setSelectedSupervisor,
    clearErrors,
    isSuccess,
    registeredEmail,
  } = useSignUp(form);

  return (
    <>
      <Head>
        <title>{getTitleMeta(data?.title, 'حساب جديد')}</title>
        <meta name="description" content={data?.description} key="desc" />
      </Head>
      {isSuccess ? (
        <VerifyAccount email={registeredEmail} isSuccess={isSuccess} />
      ) : (
        <StyledForm
          form={form}
          name="signUp"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          size="large"
          onValuesChange={(field) => clearErrors(field, form)}
          {...formLayout}
        >
          <Form.Item label="البريد الإلكتروني" name="email" rules={emailRules}>
            <Input type="email" />
          </Form.Item>

          <SelectRole
            selectedSupervisor={selectedSupervisor}
            setSelectedSupervisor={setSelectedSupervisor}
            isSignUp
          />

          <Form.Item
            label="كلمة السر"
            style={{ marginBottom: 0 }}
            rules={[{ required: true, message: '' }]}
          >
            <Form.Item
              style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
              name="password"
              rules={passwordRules}
            >
              <Input.Password placeholder="كلمة السر" />
            </Form.Item>
            <Space>-</Space>
            <Form.Item
              style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
              name="confirmPassword"
              dependencies={['password']}
              rules={confirmPasswordRules}
            >
              <Input.Password placeholder="تأكيد كلمة السر" />
            </Form.Item>
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            wrapperCol={{ ...formLayout.wrapperCol, offset: 5 }}
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error('يجب الموافقة على شروط و أحكام الموقع')
                      ),
              },
            ]}
          >
            <Checkbox>
              أوافق على
              <Link href="/terms">
                <Button type="link">إتفاقية الإستخدام</Button>
              </Link>
            </Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ ...formLayout.wrapperCol, offset: 5 }}>
            <Button type="primary" htmlType="submit" block loading={loading}>
              تسجيل حساب جديد
            </Button>
          </Form.Item>
          <Form.Item
            wrapperCol={{ ...formLayout.wrapperCol, offset: 5 }}
            style={{ margin: 0 }}
          >
            <Divider>لديك حساب؟</Divider>
            <Link href={AppRoutes.SignIn}>
              <Button type="primary" ghost block>
                تسجيل الدخول
              </Button>
            </Link>
          </Form.Item>
        </StyledForm>
      )}
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

SignUpPage.getLayout = (page: EmotionJSX.Element) => (
  <AuthLayout>{page}</AuthLayout>
);
export default withAuth(SignUpPage, null, true);
