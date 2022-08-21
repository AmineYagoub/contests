import { Alert, Button, Drawer, Space } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import ContestForm from './ContestForm';
import { useCreateContests } from '@/hooks/contests/create-contest.hook';

const CreateContest = ({
  visible,
  onClose,
  onSuccess,
}: {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const { onFinish, loading, form, error } = useCreateContests({
    onClose,
    onSuccess,
  });

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
