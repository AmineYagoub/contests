import {
  RoleTitle,
  SendMessageDto,
  useSendNotificationsMutation,
} from '@/graphql/graphql';
import { Logger } from '@/utils/app';
import { AuthState } from '@/valtio/auth.state';
import { Form } from 'antd';
import { useSnapshot } from 'valtio';

export const useSendMessages = (onClose: () => void, onSuccess: () => void) => {
  const [form] = Form.useForm();
  const user = useSnapshot(AuthState).user;
  const getTeacherId =
    user?.role.title === RoleTitle.GoldenTeacher ? user?.profile.id : null;

  const [SendNotificationsMutation, { loading, error }] =
    useSendNotificationsMutation();

  const onFinish = async () => {
    const values: SendMessageDto = await form.validateFields();
    if (values) {
      values.recipients = values.recipients.map((e) => String(e));
      try {
        const { data } = await SendNotificationsMutation({
          variables: {
            input: {
              authorId: user.id,
              ...values,
            },
          },
        });
        if (data) {
          form.resetFields();
          onSuccess();
          onClose();
        }
      } catch (error) {
        Logger.log(error);
      }
    }
  };

  return { onFinish, loading, error, form, getTeacherId };
};
