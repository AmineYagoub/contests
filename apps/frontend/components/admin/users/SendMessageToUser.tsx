import { Alert, Button, Drawer, Form, Input, Space, notification } from 'antd';
import { MailOutlined, SendOutlined, WarningOutlined } from '@ant-design/icons';
import StyledButton from '@/components/common/StyledButton';
import { MessageType, useCreateMessageMutation } from '@/graphql/graphql';
import { useState } from 'react';
import { useSnapshot } from 'valtio';
import { AuthState } from '@/valtio/auth.state';
import { Logger } from '@/utils/app';

const SendMessageToUser = ({ id, type }: { id: string; type: MessageType }) => {
  const [form] = Form.useForm();
  const userSnap = useSnapshot(AuthState).user;
  const [CreateMessageMutation, { loading, error }] =
    useCreateMessageMutation();

  const isMessage = type === MessageType.Message;
  const message = isMessage
    ? 'تم إرسال الرسالة بنجاح'
    : 'تم إرسال التنبيه بنجاح';
  const title = isMessage ? 'إنشاء رسالة جديدة' : 'إنشاء تنبيه جديد';
  const btnText = isMessage ? 'أرسل رسالة' : 'أرسل تنبيه';
  const label = isMessage ? 'محتوى الرسالة' : 'محتوى التنبيه';

  const onFinish = async () => {
    try {
      const values = await form.getFieldsValue();
      if (values?.content) {
        const { data } = await CreateMessageMutation({
          variables: {
            input: {
              content: values.content,
              authorId: userSnap.id,
              recipientId: id,
              type,
            },
          },
        });
        if (data) {
          form.resetFields();
          hide();
          notification.success({
            message,
          });
        }
      }
    } catch (error) {
      Logger.log(error);
    }
  };

  const [open, setOpen] = useState(false);

  const show = () => {
    setOpen(true);
  };

  const hide = () => {
    setOpen(false);
  };

  return (
    <>
      <StyledButton
        icon={isMessage ? <MailOutlined /> : <WarningOutlined />}
        type="primary"
        size="middle"
        shape="round"
        onClick={show}
        ghost={!isMessage}
        danger={!isMessage}
        color={!isMessage ? 'danger' : 'inherit'}
      >
        {btnText}
      </StyledButton>

      <Drawer
        title={title}
        placement="left"
        closable={false}
        onClose={hide}
        open={open}
        width={420}
        extra={
          <Space>
            <Button onClick={hide} htmlType="reset">
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
            label={label}
            required
            rules={[
              {
                required: true,
                message: 'هذا الحقل مطلوب',
              },
            ]}
            name="content"
          >
            <Input.TextArea rows={15} />
          </Form.Item>
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
    </>
  );
};

export default SendMessageToUser;
