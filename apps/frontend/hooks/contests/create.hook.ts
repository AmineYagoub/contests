import { Form } from 'antd';
import { TagValue } from '@/components/common/SelectTopics';
import {
  Contest,
  ContestStatus,
  useCreateContestMutation,
  useUpdateContestMutation,
} from '@/graphql/graphql';
import { ContestActions } from '@/valtio/contest.state';
import { useSnapshot } from 'valtio';
import { AuthState } from '@/valtio/auth.state';
import { Logger } from '@/utils/app';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

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
  const user = useSnapshot(AuthState).user;
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
      const { year, month, day, time, ...rest } = values;
      const startTime = dayjs(
        `${year}-${month}-${day} ${dayjs(time.toString()).format('HH:mm')}`
      ).format();

      const payload = {
        ...rest,
        startTime,
        status: ContestStatus.NotStarted,
        authorId: user.id,
        topics: {
          connect: values.topics?.map((tag: TagValue) => ({
            id: tag.value,
          })),
        },
      };
      const data = record
        ? await UpdateContestMutation({
            variables: {
              input: payload,
              id: record.id,
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
      Logger.log(error);
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
