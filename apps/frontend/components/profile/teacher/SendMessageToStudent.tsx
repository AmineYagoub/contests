import DOMPurify from 'isomorphic-dompurify';
import { MailOutlined } from '@ant-design/icons';
import React, { FormEvent, useState } from 'react';
import { Button, Modal, Form, notification, Input, Tooltip } from 'antd';
import { useReactiveVar } from '@apollo/client';
import { socketVar } from '@/utils/app';

const { TextArea } = Input;

type MessageInfo = {
  ownerId: string;
  recipientId: string;
  recipientName: string;
};

const SendMessageToStudent = ({ info }: { info?: MessageInfo }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const socket = useReactiveVar(socketVar);

  //const [CreateMessageMutation] = useCreateMessageMutation();
  //const [AddToContactListMutation] = useAddToContactListMutation();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleOk = async () => {
    const content = form.getFieldValue('content');
    try {
      /* if (content) {
        setConfirmLoading(true);
        const { data } = await CreateMessageMutation({
          variables: {
            input: {
              content: DOMPurify.sanitize(content, {
                USE_PROFILES: { html: false },
              }),
              owner: info.ownerId,
              recipient: info.recipientId,
            },
          },
        });
        if (data) {
          socket.emit("onMessageCreated", {
            data: data.createMessage,
            to: info.recipientId,
          });
          await AddToContactListMutation({
            variables: {
              id: info.ownerId,
              contactId: info.recipientId,
            },
          });
        }

        setIsModalVisible(false);
        notification.success({
          message: "أرسلت الرسالة",
          description: "تم إرسال رسالتك بنجاح.",
        });
      } */
    } catch (e) {
      notification.error({
        message: 'حدث خطأ',
        description: 'حدث خطأ غير متوقع. يرجى إعادة المحاولة',
      });
      console.error(e);
    } finally {
      form.resetFields();
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Tooltip title="أرسل رسالة خاصة للطالب" color="magenta">
        <Button
          shape="circle"
          icon={<MailOutlined style={{ color: 'magenta' }} />}
          onClick={showModal}
        />
      </Tooltip>
      <Modal
        title={
          <span>
            إرسال رسالة خاصة إلى <a>{info?.recipientName}</a>
          </span>
        }
        okText="أرسل"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        forceRender
        width={800}
      >
        <Form
          form={form}
          size="large"
          layout="horizontal"
          scrollToFirstError
          onSubmitCapture={onSubmit}
        >
          <Form.Item
            name="content"
            rules={[
              {
                required: true,
                message: 'يرجى كتابة محتوى الرسالة',
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SendMessageToStudent;
