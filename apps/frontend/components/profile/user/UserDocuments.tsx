import { Button, Form, Space, Tooltip, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

import { User } from '@/graphql/graphql';
import { useUploadDocuments, useUser } from '@/hooks/profile/user.hook';
import { CloudUploadOutlined, InfoCircleOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

const StyledForm = styled(Form)({
  maxWidth: 450,
  padding: '20px 5px !important',
  margin: '0 !important',
});

const formLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 18 },
};

const Label = ({ label, help }: { label: string; help: string }) => {
  return (
    <Space>
      <span>{label}</span>
      <Tooltip title={help}>
        <InfoCircleOutlined />
      </Tooltip>
    </Space>
  );
};

const UserDocuments = ({ user }: { user: User }) => {
  const [form] = Form.useForm();
  const { onFinish, onFinishFailed, uploadProps } = useUploadDocuments();
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
      <Form.Item
        label={<Label label="الصورة الشخصية" help="صورة شخصية حديثة" />}
        name="personalImage"
      >
        <ImgCrop rotate>
          <Upload {...uploadProps}>
            <Button icon={<CloudUploadOutlined />} block type="primary" ghost>
              رفع الصورة الشخصية
            </Button>
          </Upload>
        </ImgCrop>
      </Form.Item>
      <Form.Item
        label={
          <Label
            label="إثبات الهوية"
            help="شهادة الميلاد أو ما يعادلها في بلدك."
          />
        }
        name="birthCertImage"
      >
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture"
        >
          <Button icon={<CloudUploadOutlined />} block type="primary" ghost>
            رفع شهادة الميلاد
          </Button>
        </Upload>
      </Form.Item>

      <Form.Item
        label={
          <Label label="خطاب معتمد من المدرسة" help="خطاب معتمد من المدرسة" />
        }
        name="letterImage"
      >
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture"
        >
          <Button icon={<CloudUploadOutlined />} block type="primary" ghost>
            رفع الخطاب
          </Button>
        </Upload>
      </Form.Item>
    </StyledForm>
  );
};

export default UserDocuments;
