import { Button, Checkbox, Divider, Form, Input, Popover, Select } from 'antd';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';

import VerifyAccount from '@/components/auth/VerifyAccount';
import { RoleTitle } from '@/graphql/graphql';
import {
  confirmPasswordRules,
  emailRules,
  passwordRules,
  roleRules,
  useSignUp,
} from '@/hooks/auth/signup.hook';
import AuthLayout from '@/layout/AuthLayout';
import { AppRoutes } from '@/utils/routes';
import { NextPageWithLayout } from '@/utils/types';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import styled from '@emotion/styled';

const { Option } = Select;

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
    roleHandler,
    isSuccess,
    registeredEmail,
  } = useSignUp(form);

  return (
    <AnimatePresence initial={false} mode="wait">
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
          {...formLayout}
        >
          <Form.Item label="البريد الإلكتروني" name="email" rules={emailRules}>
            <Input type="email" />
          </Form.Item>

          <Form.Item
            label="نوع العضوية"
            style={{ marginBottom: 0 }}
            rules={[{ required: true, message: '' }]}
          >
            <Form.Item
              style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
              name="role"
              rules={roleRules}
            >
              <Select onChange={roleHandler.handleRoleSelect}>
                <Option value={RoleTitle.Teacher}>معلم مشرف</Option>
                <Option value={RoleTitle.StudentTeacher}>
                  طالب مرتبط بمشرف
                </Option>
                <Option value={RoleTitle.Student}>طالب</Option>
              </Select>
            </Form.Item>
            <Space>-</Space>
            <Form.Item
              style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
              name="teacherId"
            >
              <Popover
                title="إختر المعلم المشرف"
                trigger="click"
                open={roleHandler.visible}
                onOpenChange={roleHandler.handleVisibleChange}
              >
                <Select
                  disabled={roleHandler.role !== RoleTitle.StudentTeacher}
                  showSearch
                  value={roleHandler.selectedSupervisor}
                  onChange={roleHandler.handleInstructorSelect}
                >
                  <Option value="teacherId1">معلم 1</Option>
                  <Option value="teacherId2">معلم 2</Option>
                  <Option value="teacherId3">معلم 3</Option>
                </Select>
              </Popover>
            </Form.Item>
          </Form.Item>

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
                <a style={{ color: 'inherit' }}>
                  {' '}
                  <Button type="link">إتفاقية الإستخدام</Button>
                </a>
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
    </AnimatePresence>
  );
};

SignUpPage.getLayout = (page: EmotionJSX.Element) => (
  <AuthLayout>{page}</AuthLayout>
);
export default SignUpPage;
