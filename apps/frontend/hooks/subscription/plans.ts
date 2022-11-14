import {
  useCreateSubscriptionPlanMutation,
  useFindAllSubscriptionPlansQuery,
} from '@/graphql/graphql';

export const useSubscriptionPlans = () => {
  const { data } = useFindAllSubscriptionPlansQuery();

  const [
    CreateSubscriptionPlanMutation,
    { loading, error },
  ] = useCreateSubscriptionPlanMutation();

  const onFinish = async () => {
    try {
      const data = await CreateSubscriptionPlanMutation({
        variables: {
          input: {},
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

  return { data };
};
