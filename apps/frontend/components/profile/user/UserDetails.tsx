import { Button, DatePicker, Form, Input, Select } from 'antd';

import SelectCountry from '@/components/common/SelectCountry';
import SelectRole from '@/components/common/SelectRole';
import { RoleTitle, User } from '@/graphql/graphql';
import { emailRules } from '@/hooks/auth/signup.hook';
import { useUser } from '@/hooks/profile/user.hook';
import { formLayout } from '@/pages/auth/sign-up';
import { studentMappedLevels } from '@/utils/mapper';
import styled from '@emotion/styled';
import TeacherAvatar from './TeacherAvatar';

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
  const isTeacher = [RoleTitle.GoldenTeacher, RoleTitle.Teacher].includes(
    user.role.title
  );
  const {
    onFinish,
    onFinishFailed,
    selectedSupervisor,
    setSelectedSupervisor,
    loading,
    tLoading,
  } = useUser(form, user);
  return (
    <StyledForm
      form={form}
      name="user-profile"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      size="large"
      {...formLayout}
    >
      {isTeacher && (
        <Form.Item label="الصورة الشخصية">
          <TeacherAvatar user={user} />
        </Form.Item>
      )}
      <Form.Item label="الإسم الكامل" style={{ marginBottom: 0 }} required>
        <Form.Item
          style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
          name="firstName"
          rules={[{ required: true, message: 'يرجى كتابة إسمك الأول' }]}
        >
          <Input placeholder="الإسم الأول" />
        </Form.Item>
        <Space>-</Space>
        <Form.Item
          style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
          name="lastName"
          rules={[{ required: true, message: 'يرجى كتابة إسمك الثاني' }]}
        >
          <Input placeholder="الإسم الثاني" />
        </Form.Item>
      </Form.Item>
      <Form.Item label="البريد الإلكتروني" name="email" rules={emailRules}>
        <Input type="email" disabled />
      </Form.Item>

      {!isTeacher && (
        <SelectRole
          selectedSupervisor={selectedSupervisor}
          setSelectedSupervisor={setSelectedSupervisor}
          isSignUp={false}
        />
      )}

      <SelectCountry name="country" label="الجنسية" />

      <Form.Item
        name="dateOfBirth"
        label="تاريخ الميلاد"
        rules={[{ required: true, message: 'يرجى كتابة تاريخ ميلادك' }]}
      >
        <DatePicker
          style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
          showToday
          allowClear
        />
      </Form.Item>

      {isTeacher && (
        <Form.Item label="رقم الهاتف">
          <Input.Group
            compact
            style={{
              display: 'inline-block',
              width: 'calc(50% - 12px)',
              direction: 'ltr',
            }}
          >
            <Form.Item name="phoneCode" noStyle>
              <Input style={{ width: '30%' }} placeholder="20+" />
            </Form.Item>
            <Form.Item name="phone" noStyle>
              <Input style={{ width: '70%' }} />
            </Form.Item>
          </Input.Group>
        </Form.Item>
      )}

      {!isTeacher && (
        <Form.Item
          name="level"
          label="حدد مرحلتك السنية"
          rules={[{ required: true, message: 'يرجى تحديد حدد مرحلتك السنية ' }]}
        >
          <Select
            allowClear
            showArrow
            options={studentMappedLevels}
            fieldNames={{ label: 'text' }}
            style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
          />
        </Form.Item>
      )}

      <Form.Item wrapperCol={{ ...formLayout.wrapperCol, offset: 5 }}>
        <Button
          type="primary"
          htmlType="submit"
          block
          loading={loading || tLoading}
        >
          تحديث البيانات
        </Button>
      </Form.Item>
    </StyledForm>
  );
};

export default UserDetails;
