import { Button, Checkbox, Divider, Form, Input } from 'antd';
import Link from 'next/link';

import VerifyAccount from '@/components/auth/VerifyAccount';
import SelectRole from '@/components/common/SelectRole';
import {
  confirmPasswordRules,
  emailRules,
  passwordRules,
  useSignUp,
} from '@/hooks/auth/signup.hook';
import AuthLayout from '@/layout/AuthLayout';
import { AppRoutes } from '@/utils/routes';
import { NextPageWithLayout } from '@/utils/types';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import styled from '@emotion/styled';

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

const SignUpPage: NextPageWithLayout = () => {
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

SignUpPage.getLayout = (page: EmotionJSX.Element) => (
  <AuthLayout>{page}</AuthLayout>
);
export default SignUpPage;
