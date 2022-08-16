import { Button, Popconfirm, Tooltip } from 'antd';

import { Contest, useDeleteContestMutation } from '@/graphql/graphql';
import { DeleteOutlined } from '@ant-design/icons';

const DeleteContest = ({
  record,
  onSuccess,
}: {
  record: Contest;
  onSuccess: () => void;
}) => {
  const [DeleteContestMutation, { loading }] = useDeleteContestMutation();

  const confirmDelete = async () => {
    try {
      const data = await DeleteContestMutation({
        variables: {
          id: Number(record.id),
        },
      });
      if (data) {
        onSuccess();
      }
      console.log(record, data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Popconfirm
      title="سيتم حذف المسابقة و جميع المدخلات المرتبطة بها"
      onConfirm={confirmDelete}
    >
      <Tooltip title="أحذف المسابقة" color="orange">
        <Button
          shape="circle"
          icon={<DeleteOutlined style={{ color: 'red' }} />}
          danger
          loading={loading}
        />
      </Tooltip>
    </Popconfirm>
  );
};

export default DeleteContest;
