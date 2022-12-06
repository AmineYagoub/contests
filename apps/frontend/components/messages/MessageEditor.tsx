import { useState } from 'react';
import { Comment, Avatar, Form, Button, Input } from 'antd';
import { Logger } from '@/utils/app';
import { MessageType, useCreateMessageMutation } from '@/graphql/graphql';
import { useSnapshot } from 'valtio';
import { MessageState } from '@/valtio/message.state';

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
      >
        أضف رسالة
      </Button>
    </Form.Item>
  </Form>
);

const MessageEditor = ({ id, avatar }: { id: string; avatar: string }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [createMessageMutation] = useCreateMessageMutation();
  const messageSnap = useSnapshot(MessageState);
  //const socket = useReactiveVar(socketVar);

  const handleSubmit = async () => {
    const content = form.getFieldValue('content');

    if (content && messageSnap.currentContactId) {
      try {
        setLoading(true);
        const { data } = await createMessageMutation({
          variables: {
            input: {
              content,
              authorId: id,
              recipientId: messageSnap.currentContactId,
              type: MessageType.Message,
            },
          },
        });
        if (data) {
          /*           socket.emit("onMessageCreated", {
            data: data.createMessage,
            to: currentContact,
          });
 */
          form.resetFields();
        }
      } catch (error) {
        Logger.log(error);
      } finally {
        setLoading(false);
      }
    }
  };
  const isEditorDisabled = false;
  return (
    <Comment
      avatar={<Avatar src={avatar} alt="logo" />}
      content={
        <Editor
          onSubmit={handleSubmit}
          loading={loading}
          form={form}
          disabled={!isEditorDisabled}
        />
      }
    />
  );
};

export default MessageEditor;
