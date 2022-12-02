import {
  useConnectStudentToTeacherMutation,
  useDeleteMessageMutation,
} from '@/graphql/graphql';
import { Logger } from '@/utils/app';
import { CheckCircleFilled } from '@ant-design/icons';
import { Button, notification } from 'antd';

const AcceptStudent = ({
  id,
  studentId,
  messageId,
  onSuccess,
}: {
  id: string;
  studentId: string;
  messageId: string;
  onSuccess: () => void;
}) => {
  const [ConnectStudentToTeacherMutation, { loading }] =
    useConnectStudentToTeacherMutation();
  const [DeleteMessageMutation, { loading: l }] = useDeleteMessageMutation();

  const accept = async () => {
    try {
      const res = await ConnectStudentToTeacherMutation({
        variables: {
          connect: true,
          studentId,
          id,
        },
      });
      if (res) {
        const data = await DeleteMessageMutation({
          variables: {
            id: messageId,
          },
        });
        if (data) {
          onSuccess();
        }
        notification.success({
          message: 'تم قبول الإشراف على الطالب بنجاح.',
        });
      }
    } catch (error) {
      Logger.log(error);
    }
  };

  return (
    <Button
      icon={<CheckCircleFilled />}
      type="primary"
      ghost
      loading={loading || l}
      onClick={accept}
    >
      قبول
    </Button>
  );
};

export default AcceptStudent;
