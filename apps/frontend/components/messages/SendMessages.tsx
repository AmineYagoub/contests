import { Alert, Button, Drawer, Form, Input, Select, Space } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import SelectRecipients from './SelectRecipients';
import { useSendMessages } from '@/hooks/messages/send.hook';
import { messageMappedTypes } from '@/utils/mapper';

const SendMessages = ({
  visible,
  onClose,
  onSuccess,
}: {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const { onFinish, loading, form, error, getTeacherId } = useSendMessages(
    onClose,
    onSuccess
  );

  return (
    <Drawer
      title="إنشاء رسالة جديدة"
      placement="right"
      closable={false}
      onClose={onClose}
      open={visible}
      width={720}
      extra={
        <Space>
          <Button onClick={onClose} htmlType="reset">
            تراجع
          </Button>
          <Button
            onClick={onFinish}
            type="primary"
            icon={<SendOutlined />}
            htmlType="submit"
            form="create-message"
            loading={loading}
          >
            أرسل
          </Button>
        </Space>
      }
    >
      <Form
        layout="vertical"
        scrollToFirstError
        form={form}
        name="create-message"
      >
        <Form.Item
          name="type"
          label="نوع الرسالة"
          rules={[{ required: true, message: 'يرجى إختيار نوع الرسالة' }]}
        >
          <Select
            allowClear
            showArrow
            options={messageMappedTypes}
            fieldNames={{ label: 'text' }}
          />
        </Form.Item>
        <Form.Item
          label="محتوى الرسالة"
          required
          rules={[
            {
              required: true,
              message: 'هذا الحقل مطلوب',
            },
          ]}
          name="content"
        >
          <Input.TextArea rows={10} />
        </Form.Item>
        <SelectRecipients teacherId={getTeacherId} />
      </Form>
      {error && (
        <Alert
          message="خطأ"
          description="حدث خطأ أثناء إرسال الرسائل ، يرجى المحاولة مرة أخرى"
          banner
          closable
          type="error"
          showIcon
        />
      )}
    </Drawer>
  );
};

export default SendMessages;
