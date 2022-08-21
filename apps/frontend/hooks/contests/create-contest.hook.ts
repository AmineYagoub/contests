import { Form } from 'antd';
import { TagValue } from '@/components/common/SelectTags';
import {
  Contest,
  ContestStatus,
  useCreateContestMutation,
  useUpdateContestMutation,
} from '@/graphql/graphql';
import { ContestActions } from '@/valtio/contest.state';

export interface CreateContestsProps {
  visible?: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
  record?: Contest;
}

export const useCreateContests = ({
  record,
  onClose,
  onSuccess,
}: CreateContestsProps) => {
  const [form] = Form.useForm();
  const [CreateContestMutation, { loading, error }] =
    useCreateContestMutation();
  const [
    UpdateContestMutation,
    { loading: loadingUpdate, error: errorUpdate },
  ] = useUpdateContestMutation();

  const onFinish = async () => {
    try {
      ContestActions.setMutationLoading(true);
      const values = await form.validateFields();
      const payload = {
        ...values,
        status: ContestStatus.NotStarted,
        authorId: 1,
        tags: {
          connectOrCreate: values.tags?.map((tag: TagValue) => {
            return {
              where: { title: tag.value },
              create: { title: tag.value },
            };
          }),
        },
      };

      const data = record
        ? await UpdateContestMutation({
            variables: {
              input: payload,
              id: Number(record.id),
            },
          })
        : await CreateContestMutation({
            variables: {
              input: payload,
            },
          });
      if (data) {
        form.resetFields();
        onClose();
        onSuccess();
      }
    } catch (error) {
      console.log(error);
    } finally {
      ContestActions.setMutationLoading(false);
    }
  };

  return {
    onFinish,
    form,
    loading,
    error,
    loadingUpdate,
    errorUpdate,
  };
};
