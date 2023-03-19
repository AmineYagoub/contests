import { Button, Form, Input, Select } from 'antd';

import SelectCountry from '@/components/common/SelectCountry';
import SelectRole from '@/components/common/SelectRole';
import { RoleTitle, Student, User } from '@/graphql/graphql';
import { emailRules } from '@/hooks/auth/signup.hook';
import { useUser } from '@/hooks/profile/user.hook';
import { formLayout } from '@/pages/auth/sign-up';
import { studentMappedLevels } from '@/utils/mapper';
import styled from '@emotion/styled';
import TeacherAvatar from '../teacher/TeacherAvatar';
import SelectPhone from '@/components/common/SelectPhone';
import SelectDate from '@/components/common/SelectDate';

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

  const getPlaceholderText = () =>
    user.role.title === RoleTitle.StudentTeacher &&
    !(user.profile as Student).teacher
      ? 'في إنتظار موافقة المعلم'
      : null;
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
          placeholder={getPlaceholderText()}
        />
      )}

      <SelectCountry name="country" label="الجنسية" />
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
          />
        </Form.Item>
      )}

      <Form.Item
        name="dateOfBirth"
        label="تاريخ الميلاد"
        rules={[{ required: true, message: 'يرجى كتابة تاريخ ميلادك' }]}
      >
        {/* <DatePicker
          style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
          showToday
          allowClear
          dateRender={(current) => {
            const style: React.CSSProperties = {};
            if (current.date() === 1) {
              style.border = '1px solid #1890ff';
              style.borderRadius = '50%';
            }
            return (
              <div className='ant-picker-cell-inner' style={style}>
                {current.date()}
              </div>
            );
          }}
        /> */}
        {/* <Input
          placeholder='Basic usage'
          type='date'
          lang='ar'
          dir='ltr'
          pattern='\d{4}-\d{2}-\d{2}'
        /> */}
        <SelectDate />
      </Form.Item>

      {isTeacher && (
        <Form.Item label="رقم الهاتف" required>
          <SelectPhone />
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
