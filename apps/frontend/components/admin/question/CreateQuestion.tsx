import { Alert, Button, Drawer, Space } from 'antd';

import { useCreateQuestions } from '@/hooks/questions/create.hook';
import { SaveOutlined } from '@ant-design/icons';

import QuestionForm from './QuestionForm';

const CreateQuestion = ({
  visible,
  onClose,
  onSuccess,
}: {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const { onFinish, loading, form, error } = useCreateQuestions({
    onClose,
    onSuccess,
  });
  return (
    <Drawer
      title="إنشاء سؤال جديد"
      placement="right"
      closable={false}
      onClose={onClose}
      open={visible}
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
            form="create-question"
            loading={loading}
          >
            حفظ
          </Button>
        </Space>
      }
    >
      <QuestionForm form={form} />
      {error && (
        <Alert
          message="خطأ"
          description="حدث خطأ أثناء عملية حفظ السؤال ، يرجى المحاولة مرة أخرى"
          banner
          closable
          type="error"
          showIcon
        />
      )}
    </Drawer>
  );
};

export default CreateQuestion;
