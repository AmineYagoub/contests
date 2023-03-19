import { Form } from 'antd';
import {
  SubscriptionPlan,
  useCreateSubscriptionPlanMutation,
  useFindAllSubscriptionPlansQuery,
  useUpdateSubscriptionPlanMutation,
} from '@/graphql/graphql';
import { SubscriptionPlanActions } from '@/valtio/plans.state';
import { Logger } from '@/utils/app';

export interface CreatePlanProps {
  visible?: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
  record?: SubscriptionPlan;
}

export const useCreateSubscriptionPlan = ({
  record,
  onClose,
  onSuccess,
}: CreatePlanProps) => {
  const [form] = Form.useForm();
  const [CreateSubscriptionPlanMutation, { loading, error }] =
    useCreateSubscriptionPlanMutation();
  const [
    UpdateSubscriptionPlanMutation,
    { loading: loadingUpdate, error: errorUpdate },
  ] = useUpdateSubscriptionPlanMutation();

  const onFinish = async () => {
    try {
      SubscriptionPlanActions.setMutationLoading(true);
      const values = await form.validateFields();
      const price = Number(values.price * 100);
      const period = values?.period ?? -1;
      const allowedContests = values?.allowedContests ?? -1;
      const data = record
        ? await UpdateSubscriptionPlanMutation({
            variables: {
              input: { ...values, price, period, allowedContests },
              id: record.id,
            },
          })
        : await CreateSubscriptionPlanMutation({
            variables: {
              input: { ...values, price },
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
      SubscriptionPlanActions.setMutationLoading(false);
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

export const useFindPlans = () => {
  const { data, loading, refetch } = useFindAllSubscriptionPlansQuery({
    variables: {},
    ssr: false,
  });

  return {
    refetch,
    data:
      data?.findAllSubscriptionPlans?.map((d) => ({ key: d.id, ...d })) ?? [],
    loading,
  };
};
