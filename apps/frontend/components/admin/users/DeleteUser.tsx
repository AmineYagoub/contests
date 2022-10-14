import { Button, Popconfirm } from 'antd';

import { useDeleteUserMutation, User } from '@/graphql/graphql';
import { DeleteOutlined } from '@ant-design/icons';
import { Logger } from '@/utils/app';

const DeleteUser = ({
  record,
  onSuccess,
}: {
  record: User;
  onSuccess: () => void;
}) => {
  const [DeleteUserMutation, { loading }] = useDeleteUserMutation();
  const confirmDelete = async () => {
    try {
      const data = await DeleteUserMutation({
        variables: {
          id: record.id,
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
      title="هل أنت متأكد من حذف المستخدم ؟"
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

export default DeleteUser;
