import {
  Question,
  CreateQuestionDto,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
} from '@/graphql/graphql';
import { Form } from 'antd';
import { useSnapshot } from 'valtio';
import { AuthState } from '@/valtio/auth.state';
import { QuestionActions } from '@/valtio/question.state';
import { TagValue } from '@/components/common/SelectTopics';

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
  const user = useSnapshot(AuthState).user;

  const onFinish = async () => {
    try {
      QuestionActions.setMutationLoading(true);
      const values = await form.validateFields();
      const payload: CreateQuestionDto = {
        ...values,
        authorId: user?.id,
        correctAnswer: values.options.shift(),
        topics: {
          connect: values.topics?.map((tag) => ({
            title:
              typeof tag.label === 'string'
                ? tag.label
                : tag.label?.props.children.props.children,
          })),
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
