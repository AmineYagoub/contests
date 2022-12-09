import { Comment, Avatar, Form, Button, Input } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import { SendOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const isMobileOnly = false;

const Editor = ({ form, onSubmit, loading, disabled }) => (
  <Form
    form={form}
    size="large"
    layout="horizontal"
    scrollToFirstError
    onSubmitCapture={onSubmit}
  >
    <Form.Item
      noStyle
      name="content"
      rules={[
        {
          required: true,
          message: 'يرجى كتابة محتوى الرسالة',
        },
      ]}
    >
      <TextArea
        rows={4}
        disabled={disabled}
        style={isMobileOnly ? { maxHeight: 100, margin: '5px 0' } : null}
      />
    </Form.Item>
    <Form.Item noStyle={isMobileOnly}>
      <Button
        htmlType="submit"
        loading={loading}
        type="primary"
        size="middle"
        disabled={disabled}
        icon={<SendOutlined />}
      >
        أضف رسالة
      </Button>
    </Form.Item>
  </Form>
);

const MessageEditor = ({
  id,
  avatar,
  disabled,
  handleSubmit,
  loading,
  form,
}: {
  id: string;
  avatar: string;
  disabled: boolean;
  handleSubmit: () => Promise<void>;
  loading: boolean;
  form: FormInstance<unknown>;
}) => {
  return (
    <Comment
      avatar={<Avatar src={avatar} alt="logo" />}
      content={
        <Editor
          onSubmit={handleSubmit}
          loading={loading}
          form={form}
          disabled={disabled}
        />
      }
    />
  );
};

export default MessageEditor;
