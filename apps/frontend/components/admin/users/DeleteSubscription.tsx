import { Button, Popconfirm } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import { SubscriptionPlan } from '@/graphql/graphql';
import { useSubscriptionPlans } from '@/hooks/subscription/plans';

const DeleteSubscription = ({ plan }: { plan: SubscriptionPlan }) => {
  const { methods, submitWait } = useSubscriptionPlans();

  return (
    <Popconfirm
      title='هل أنت متأكد من حذف إشتراكك في المنصة ?'
      onConfirm={() => methods.submitSubscription(plan, true)}
      okButtonProps={{ loading: submitWait }}
    >
      <Button size='small' type='primary' danger icon={<DeleteFilled />}>
        حذف الإشتراك
      </Button>
    </Popconfirm>
  );
};

export default DeleteSubscription;
