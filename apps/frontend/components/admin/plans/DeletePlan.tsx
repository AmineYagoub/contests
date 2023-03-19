import { Button, Popconfirm } from 'antd';

import {
  SubscriptionPlan,
  useDeleteSubscriptionPlanMutation,
} from '@/graphql/graphql';
import { DeleteOutlined } from '@ant-design/icons';

const DeletePlan = ({
  record,
  onSuccess,
}: {
  record: SubscriptionPlan;
  onSuccess: () => void;
}) => {
  const [DeleteSubscriptionPlanMutation, { loading }] =
    useDeleteSubscriptionPlanMutation();

  const confirmDelete = async () => {
    try {
      const data = await DeleteSubscriptionPlanMutation({
        variables: {
          id: record.id,
        },
      });
      if (data) {
        onSuccess();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Popconfirm
      title="سيتم حذف الخطة و جميع المدخلات المرتبطة بها"
      onConfirm={confirmDelete}
    >
      <Button
        shape="circle"
        icon={<DeleteOutlined style={{ color: 'red' }} />}
        danger
        loading={loading}
      />
    </Popconfirm>
  );
};

export default DeletePlan;
