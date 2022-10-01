import { DatePicker, Form, Input } from 'antd';

import SelectCountry from '@/components/common/SelectCountry';
import SelectRole from '@/components/common/SelectRole';
import { User } from '@/graphql/graphql';
import { emailRules } from '@/hooks/auth/signup.hook';
import { useUser } from '@/hooks/profile/user.hook';
import { formLayout } from '@/pages/auth/sign-up';
import styled from '@emotion/styled';

const StyledForm = styled(Form)({
  maxWidth: 680,
  padding: '20px 5px !important',
  margin: '0 !important',
});

const Space = styled('span')({
  display: 'inline-block',
  width: '24px',
  lineHeight: '32px',
  textAlign: 'center',
});

const UserDetails = ({ user }: { user: User }) => {
  const [form] = Form.useForm();
  const {
    onFinish,
    onFinishFailed,
    selectedSupervisor,
    setSelectedSupervisor,
  } = useUser(form);
  return (
    <StyledForm
      form={form}
      name="user-profile"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      size="large"
      initialValues={{ email: user?.email }}
      {...formLayout}
    >
      <Form.Item
        label="الإسم الكامل"
        style={{ marginBottom: 0 }}
        rules={[{ required: true, message: '' }]}
      >
        <Form.Item
          style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
          name="firstName"
        >
          <Input placeholder="الإسم الأول" />
        </Form.Item>
        <Space>-</Space>
        <Form.Item
          style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
          name="lastName"
        >
          <Input placeholder="الإسم الثاني" />
        </Form.Item>
      </Form.Item>
      <Form.Item label="البريد الإلكتروني" name="email" rules={emailRules}>
        <Input type="email" />
      </Form.Item>

      <SelectRole
        selectedSupervisor={selectedSupervisor}
        setSelectedSupervisor={setSelectedSupervisor}
      />

      <SelectCountry name="country" label="الجنسية" />

      <Form.Item name="age" label="تاريخ الميلاد">
        <DatePicker
          style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
        />
      </Form.Item>
    </StyledForm>
  );
};

export default UserDetails;
