import { Button, Form, Upload } from 'antd';

import { User } from '@/graphql/graphql';
import { useUser } from '@/hooks/profile/user.hook';
import { formLayout } from '@/pages/auth/sign-up';
import { CloudUploadOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

const StyledForm = styled(Form)({
  maxWidth: 450,
  padding: '20px 5px !important',
  margin: '0 !important',
});

const UserDocuments = ({ user }: { user: User }) => {
  const [form] = Form.useForm();
  const { onFinish, onFinishFailed } = useUser(form);
  return (
    <StyledForm
      form={form}
      name="user-documents"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      size="large"
      {...formLayout}
    >
      <Form.Item label="الصورة الشخصية" name="identity">
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture"
        >
          <Button icon={<CloudUploadOutlined />} block type="primary" ghost>
            رفع الصورة الشخصية
          </Button>
        </Upload>
      </Form.Item>
      <Form.Item label="إثبات الهوية" name="image">
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture"
        >
          <Button icon={<CloudUploadOutlined />} block type="primary" ghost>
            رفع شهادة الميلاد
          </Button>
        </Upload>
      </Form.Item>
    </StyledForm>
  );
};

export default UserDocuments;
