import { Button, Divider, Form, Input, InputNumber, Select } from 'antd';
import AuthLayout from '@/layout/AuthLayout';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { NextPageWithLayout } from '@/config/types';
import styled from '@emotion/styled';
import Link from 'next/link';

const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const StyledForm = styled(Form)({
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
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <StyledForm
      name="signin"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      size="large"
      {...layout}
    >
      <Form.Item
        label="الإسم الكامل"
        name="name"
        style={{ marginBottom: 0 }}
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Form.Item
          style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
        >
          <Input placeholder="الإسم الأول" />
        </Form.Item>
        <Space>-</Space>
        <Form.Item
          style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
        >
          <Input placeholder="إسم العائلة" />
        </Form.Item>
      </Form.Item>

      <Form.Item
        label="البريد الإلكتروني"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input type="email" />
      </Form.Item>

      <Form.Item
        label="نوع العضوية"
        name="role"
        style={{ marginBottom: 0 }}
        rules={[{ required: true, message: 'Please input your role!' }]}
      >
        <Form.Item
          style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
        >
          <Select>
            <Option value="rmb">معلم مشرف</Option>
            <Option value="dollar">طالب مرتبط بمشرف</Option>
            <Option value="dollar">طالب</Option>
          </Select>
        </Form.Item>
        <Space>-</Space>
        <Form.Item
          style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
        >
          <Select placeholder="إختر المعلم المشرف" disabled>
            <Option value="rmb">معلم مشرف</Option>
            <Option value="dollar">طالب مرتبط بمشرف</Option>
            <Option value="dollar">طالب</Option>
          </Select>
        </Form.Item>
      </Form.Item>

      <Form.Item
        name="age"
        label="السن"
        rules={[
          {
            type: 'number',
            min: 10,
            max: 20,
            message: 'السن يجب ان يكون بين 10 و 20',
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item name="nationality" label="الجنسية">
        <Select
          showSearch
          optionFilterProp="children"
          /* onChange={onChange}
    onSearch={onSearch}
    filterOption={(input, option) =>
      (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
    } */
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="tom">Tom</Option>
        </Select>
      </Form.Item>

      <Form.Item name="facebook" label="صفحة الفايسبوك">
        <Input
          addonAfter="/https://facebook.com"
          placeholder="your-name"
          style={{ textAlign: 'left' }}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
        <Button type="primary" htmlType="submit" block>
          تسجيل حساب جديد
        </Button>
      </Form.Item>
      <Form.Item
        wrapperCol={{ ...layout.wrapperCol, offset: 6 }}
        style={{ margin: 0 }}
      >
        <Divider>لديك حساب؟</Divider>
        <Link href="/auth/signin">
          <Button type="primary" ghost block>
            تسجيل الدخول
          </Button>
        </Link>
      </Form.Item>
    </StyledForm>
  );
};

SignUpPage.getLayout = (page: EmotionJSX.Element) => (
  <AuthLayout>{page}</AuthLayout>
);
export default SignUpPage;
