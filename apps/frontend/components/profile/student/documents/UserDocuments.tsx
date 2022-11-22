import { Form, Space, Tooltip } from 'antd';

import { User } from '@/graphql/graphql';
import { useUploadDocuments } from '@/hooks/profile/document.hook';
import { InfoCircleOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import DocumentCard from './DocumentCard';

const StyledForm = styled(Form)({
  maxWidth: 450,
  padding: '20px 5px !important',
  margin: '0 !important',
});

const { Item } = Form;

const StyledItem = styled(Item)({
  ['.ant-row']: {
    alignItems: 'center',
  },
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
  const { onUploadChange, docsList, loading, onDelete, confirmLoading } =
    useUploadDocuments(user);
  return (
    <StyledForm form={form} name="user-documents" size="large" {...formLayout}>
      <StyledItem
        label={<Label label="الصورة الشخصية" help="صورة شخصية حديثة" />}
        name="personalImage"
      >
        <DocumentCard
          name="personalImage"
          url={docsList?.personalImage.url}
          id={user.id}
          label="رفع الصورة الشخصية"
          onChange={onUploadChange}
          loading={loading}
          onDelete={onDelete}
          confirmLoading={confirmLoading}
        />
      </StyledItem>
      <StyledItem
        label={
          <Label
            label="إثبات الهوية"
            help="شهادة الميلاد أو ما يعادلها في بلدك."
          />
        }
        name="birthCertImage"
      >
        <DocumentCard
          name="birthCertImage"
          url={docsList?.birthCertImage.url}
          id={user.id}
          label="رفع شهادة الميلاد"
          onChange={onUploadChange}
          loading={loading}
          onDelete={onDelete}
          confirmLoading={confirmLoading}
        />
      </StyledItem>

      <StyledItem
        label={
          <Label
            label="خطاب معتمد من المدرسة"
            help="شهادة مدرسية أو خطاب معتمد من المدرسة موضح به سنك والصف الدراسي الملتحق به"
          />
        }
        name="letterImage"
      >
        <DocumentCard
          name="letterImage"
          url={docsList?.letterImage.url}
          id={user.id}
          label="رفع الخطاب"
          onChange={onUploadChange}
          loading={loading}
          onDelete={onDelete}
          confirmLoading={confirmLoading}
        />
      </StyledItem>
    </StyledForm>
  );
};

export default UserDocuments;
