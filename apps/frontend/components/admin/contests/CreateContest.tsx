import { Alert, Button, Drawer, Form, Space } from 'antd';

import { ContestStatus, useCreateContestMutation } from '@/graphql/graphql';
import { SaveOutlined } from '@ant-design/icons';

import ContestForm from './ContestForm';

const CreateContest = ({
  visible,
  onClose,
  onSuccess,
}: {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const [form] = Form.useForm();
  const [createContestMutation, { loading, error }] =
    useCreateContestMutation();

  const onFinish = async () => {
    try {
      const values = await form.validateFields();

      const data = await createContestMutation({
        variables: {
          input: {
            ...values,
            status: ContestStatus.NotStarted,
            authorId: 1,
          },
        },
      });

      if (data) {
        form.resetFields();
        onClose();
        onSuccess();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Drawer
      title="إنشاء مسابقة جديدة"
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
      getContainer={false}
      style={{ position: 'absolute' }}
      bodyStyle={{ paddingBottom: 80 }}
      width={720}
      destroyOnClose
      extra={
        <Space>
          <Button onClick={onClose} htmlType="reset">
            تراجع
          </Button>
          <Button
            onClick={onFinish}
            type="primary"
            icon={<SaveOutlined />}
            htmlType="submit"
            form="create-contest"
            loading={loading}
          >
            حفظ
          </Button>
        </Space>
      }
    >
      <ContestForm form={form} />
      {error && (
        <Alert
          message="خطأ"
          description="حدث خطأ أثناء حفظ المسابقة ، يرجى المحاولة مرة أخرى"
          banner
          closable
          type="error"
          showIcon
        />
      )}
    </Drawer>
  );
};

export default CreateContest;
