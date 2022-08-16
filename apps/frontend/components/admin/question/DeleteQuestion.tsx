import { Button, Popconfirm, Tooltip } from 'antd';

import { Question, useDeleteQuestionMutation } from '@/graphql/graphql';
import { DeleteOutlined } from '@ant-design/icons';

const DeleteQuestion = ({
  record,
  onSuccess,
}: {
  record: Question;
  onSuccess: () => void;
}) => {
  const [DeleteQuestionMutation, { loading }] = useDeleteQuestionMutation();

  const confirmDelete = async () => {
    try {
      const data = await DeleteQuestionMutation({
        variables: {
          id: Number(record.id),
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
      title="سيتم حذف السؤال و جميع المدخلات المرتبطة به"
      onConfirm={confirmDelete}
    >
      <Tooltip title="أحذف السؤال" color="orange">
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

export default DeleteQuestion;
