import {
  useCreateSubscriptionPlanMutation,
  useFindAllSubscriptionPlansQuery,
} from '@/graphql/graphql';

export const useSubscriptionPlans = () => {
  const { data, refetch } = useFindAllSubscriptionPlansQuery();

  const [
    CreateSubscriptionPlanMutation,
    { loading, error },
  ] = useCreateSubscriptionPlanMutation();

  const onFinish = async () => {};

  return { data, refetch };
};
