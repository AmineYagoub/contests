import { Button, Divider, Form, Input } from 'antd';

import { User } from '@/graphql/graphql';
import { confirmPasswordRules, passwordRules } from '@/hooks/auth/signup.hook';
import styled from '@emotion/styled';
import { usePassword } from '@/hooks/profile/password.hook';

const StyledForm = styled(Form)({
  maxWidth: 450,
  padding: '0 5px !important',
  margin: '0 !important',
});

export const formLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 15 },
};

const UserPassword = ({ user }: { user: User }) => {
  const [form] = Form.useForm();
  const { onFinish, onFinishFailed, clearErrors } = usePassword(form, user);
  return (
    <StyledForm
      form={form}
      name="change-password"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onValuesChange={(field) => clearErrors(field, form)}
      autoComplete="off"
      size="large"
      {...formLayout}
    >
      <h1 style={{ margin: '15px 0' }}>إعادة ضبط كلمة سر جديدة</h1>

      <Form.Item
        label="كلمة السر الحالية"
        name="currentPassword"
        rules={passwordRules}
      >
        <Input.Password />
      </Form.Item>
      <Divider />
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
      <Form.Item wrapperCol={{ ...formLayout.wrapperCol, offset: 10 }}>
        <Button type="primary" htmlType="submit" block>
          تغيير كلمة السر
        </Button>
      </Form.Item>
    </StyledForm>
  );
};

export default UserPassword;
