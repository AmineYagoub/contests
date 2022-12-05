import { Form } from 'antd';
import { TagValue } from '@/components/common/SelectTopics';
import {
  Question,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
} from '@/graphql/graphql';
import { QuestionActions } from '@/valtio/question.state';

export interface CreateQuestionsProps {
  visible?: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
  record?: Question;
}

export const useCreateQuestions = ({
  record,
  onClose,
  onSuccess,
}: CreateQuestionsProps) => {
  const [form] = Form.useForm();
  const [CreateQuestionMutation, { loading, error }] =
    useCreateQuestionMutation();
  const [
    UpdateQuestionMutation,
    { loading: loadingUpdate, error: errorUpdate },
  ] = useUpdateQuestionMutation();

  const onFinish = async () => {
    try {
      QuestionActions.setMutationLoading(true);
      const values = await form.validateFields();
      const payload = {
        ...values,
        authorId: 1,
        correctAnswer: values.options.shift(),
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
        ? await UpdateQuestionMutation({
            variables: {
              input: payload,
              id: record.id,
            },
          })
        : await CreateQuestionMutation({
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
      QuestionActions.setMutationLoading(false);
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
