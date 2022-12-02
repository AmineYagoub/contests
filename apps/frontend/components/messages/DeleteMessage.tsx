import { Button, Popconfirm } from 'antd';

import { useDeleteMessageMutation } from '@/graphql/graphql';
import { DeleteOutlined } from '@ant-design/icons';
import { Logger } from '@/utils/app';

const DeleteMessage = ({
  id,
  onSuccess,
}: {
  id: string;
  onSuccess: () => void;
}) => {
  const [DeleteMessageMutation, { loading }] = useDeleteMessageMutation();
  const confirmDelete = async () => {
    try {
      const data = await DeleteMessageMutation({
        variables: {
          id,
        },
      });
      if (data) {
        onSuccess();
      }
    } catch (error) {
      Logger.log(error);
    }
  };
  return (
    <Popconfirm
      title="هل أنت متأكد من حذف هذه الرسالة ؟"
      onConfirm={confirmDelete}
    >
      <Button
        icon={<DeleteOutlined style={{ color: 'red' }} />}
        danger
        loading={loading}
      >
        حذف
      </Button>
    </Popconfirm>
  );
};

export default DeleteMessage;
