import { Alert, Button, Drawer, Space } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

import SubscriptionPlanForm from './SubscriptionPlanForm';
import { useCreateSubscriptionPlan } from '@/hooks/admin/manage-plans.hook';

const CreatePlan = ({
  visible,
  onClose,
  onSuccess,
}: {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const { onFinish, loading, form, error } = useCreateSubscriptionPlan({
    onClose,
    onSuccess,
  });
  return (
    <Drawer
      title="إنشاء خطة جديدة"
      placement="left"
      closable={false}
      onClose={onClose}
      open={visible}
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
      <SubscriptionPlanForm form={form} />
      {error && (
        <Alert
          message="خطأ"
          description="حدث خطأ أثناء عملية حفظ الخطة ، يرجى المحاولة مرة أخرى"
          banner
          closable
          type="error"
          showIcon
        />
      )}
    </Drawer>
  );
};

export default CreatePlan;
