import { Button, Divider, Form, Input } from "antd";
import AuthLayout from "@/layout/AuthLayout";
import { EmotionJSX } from "@emotion/react/types/jsx-namespace";
import { NextPageWithLayout } from "@/config/types";
import styled from "@emotion/styled";
import Link from "next/link";

const StyledForm = styled(Form)({
  maxWidth: 400,
  padding: "30px 50px !important",
  backgroundColor: "#fff",
  boxShadow:
    "0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)",
});

const SignInPage: NextPageWithLayout = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <StyledForm
      name="signin"
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      size="large"
      colon
    >
      <Form.Item
        label="البريد الإلكتروني"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="كلمة السر"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Link href="/auth/forgot">نسيت كلمة السر؟</Link>
      </Form.Item>
      <Button type="primary" htmlType="submit" block>
        تسجيل الدخول
      </Button>
      <Divider>ليس لديك حساب؟</Divider>
      <Link href="/auth/register">
        <Button type="primary" ghost block>
          أنشئ حساب جديد
        </Button>
      </Link>
    </StyledForm>
  );
};

SignInPage.getLayout = (page: EmotionJSX.Element) => (
  <AuthLayout>{page}</AuthLayout>
);
export default SignInPage;
