import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Popover,
} from 'antd';
import AuthLayout from '@/layout/AuthLayout';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { NextPageWithLayout } from '@/config/types';
import styled from '@emotion/styled';
import Link from 'next/link';
import { AppRoutes } from '@/config/routes';
import { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';

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
  const [role, setRole] = useState('');
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const [selectedItem, setSelectedItem] = useState<string>('');
  const [visible, setVisible] = useState(false);

  const handleRoleSelect = (value: string) => {
    setRole(value);
    setVisible(true);
    if (value !== 'student1') {
      setSelectedItem('');
      setVisible(false);
    }
  };

  const handleInstructorSelect = (value: string) => {
    setSelectedItem(value);
    setVisible(false);
  };

  const handleVisibleChange = (newVisible: boolean) => {
    setVisible(newVisible);
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
        style={{ marginBottom: 0 }}
        rules={[{ required: true, message: '' }]}
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
        rules={[{ required: true, message: '' }]}
      >
        <Input type="email" />
      </Form.Item>

      <Form.Item
        label="نوع العضوية"
        name="role"
        style={{ marginBottom: 0 }}
        rules={[{ required: true, message: '' }]}
      >
        <Form.Item
          style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
        >
          <Select onChange={handleRoleSelect}>
            <Option value="instructor">معلم مشرف</Option>
            <Option value="student1">طالب مرتبط بمشرف</Option>
            <Option value="student0">طالب</Option>
          </Select>
        </Form.Item>
        <Space>-</Space>
        <Form.Item
          style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
        >
          <Popover
            title="إختر المعلم المشرف"
            trigger="click"
            visible={visible}
            onVisibleChange={handleVisibleChange}
          >
            <Select
              placeholder="إختر المعلم المشرف"
              disabled={role !== 'student1'}
              showSearch
              value={selectedItem}
              onChange={handleInstructorSelect}
              onBlur={() => setVisible(false)}
            >
              <Option value="inst1">معلم 1</Option>
              <Option value="inst2">معلم 2</Option>
              <Option value="inst3">معلم 3</Option>
            </Select>
          </Popover>
        </Form.Item>
      </Form.Item>

      <Form.Item
        name="age"
        label="السن"
        required
        rules={[
          {
            type: 'number',
            min: 10,
            max: 20,
            message: 'السن يجب ان يكون بين 10 و 20',
          },
        ]}
      >
        <InputNumber
          style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
        />
      </Form.Item>

      <Form.Item name="nationality" label="الجنسية" required>
        <Select showSearch optionFilterProp="children">
          <Option value="jack">الجنسية</Option>
          <Option value="lucy">الجنسية</Option>
          <Option value="tom">الجنسية</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="إثبات الهوية"
        name="identity"
        style={{ marginBottom: 0 }}
        rules={[{ required: true, message: '' }]}
      >
        <Form.Item
          style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
        >
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture"
          >
            <Button icon={<UploadOutlined />} block type="primary" ghost>
              رفع الصورة الشخصية
            </Button>
          </Upload>
        </Form.Item>
        <Space>-</Space>
        <Form.Item
          style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
        >
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture"
          >
            <Button icon={<UploadOutlined />} block type="primary" ghost>
              رفع شهادة الميلاد
            </Button>
          </Upload>
        </Form.Item>
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
        <Link href={AppRoutes.SignIn}>
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
