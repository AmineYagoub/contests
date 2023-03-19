import { Button, Popconfirm } from 'antd';

import { Contest, useDeleteContestMutation } from '@/graphql/graphql';
import { DeleteOutlined } from '@ant-design/icons';
import { Logger } from '@/utils/app';

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
      title="سيتم حذف المسابقة و جميع المدخلات المرتبطة بها"
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

export default DeleteContest;
