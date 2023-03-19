import { Button, Popconfirm } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import { SubscriptionPlan } from '@/graphql/graphql';
import { useSubscriptionPlans } from '@/hooks/subscription/plans';

const DeleteSubscription = ({
  plan,
  profileId,
  onSuccess,
}: {
  plan: SubscriptionPlan;
  profileId?: string;
  onSuccess?: () => void;
}) => {
  const { methods, submitWait } = useSubscriptionPlans();

  const onDeleted = async () => {
    await methods.submitSubscription(plan, true, profileId);
    if (onSuccess) onSuccess();
  };

  return (
    <Popconfirm
      title="هل أنت متأكد من حذف إشتراكك في المنصة ?"
      onConfirm={onDeleted}
      okButtonProps={{ loading: submitWait }}
    >
      <Button size="small" type="primary" danger icon={<DeleteFilled />}>
        حذف الإشتراك
      </Button>
    </Popconfirm>
  );
};

export default DeleteSubscription;
