import { Popconfirm, notification } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { TableBtn } from '@/pages/admin/dashboard';
import { useDeleteAllQuestionsMutation } from '@/graphql/graphql';

const DeleteAllQuestions = ({ onSuccess }: { onSuccess: () => void }) => {
  const [DeleteQuestionMutation, { loading }] = useDeleteAllQuestionsMutation();

  const confirmDelete = async () => {
    try {
      const { data } = await DeleteQuestionMutation();
      if (data?.deleteAllQuestions?.count) {
        onSuccess();
        notification.success({
          message: `تم حذف ${data.deleteAllQuestions.count} سؤال بنجاح!`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Popconfirm
      title="سيتم حذف كل الأسئلة دون رجعة!!! متأكد؟"
      onConfirm={confirmDelete}
    >
      <TableBtn
        type="primary"
        icon={<DeleteOutlined />}
        danger
        loading={loading}
      />
    </Popconfirm>
  );
};

export default DeleteAllQuestions;
