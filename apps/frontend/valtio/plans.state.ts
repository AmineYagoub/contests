import { proxy } from 'valtio';

import { SubscriptionPlan } from '@/graphql/graphql';
import { cloneDeep } from '@apollo/client/utilities';

interface SubscriptionPlanStorage {
  plans: SubscriptionPlan[];
  queryLoading: boolean;
  mutationLoading: boolean;
}

const init: SubscriptionPlanStorage = {
  plans: [],
  mutationLoading: false,
  queryLoading: false,
};

export const SubscriptionPlanState = proxy<SubscriptionPlanStorage>(init);

export const SubscriptionPlanActions = {
  setSubscriptionPlans: (plans: SubscriptionPlan[]) => {
    SubscriptionPlanState.plans = plans;
  },
  setQueryLoading: (loading: boolean) => {
    SubscriptionPlanState.queryLoading = loading;
  },
  setMutationLoading: (loading: boolean) => {
    SubscriptionPlanState.mutationLoading = loading;
  },

  resetState: () => {
    const resetObj = cloneDeep(init);
    Object.keys(resetObj).forEach((key) => {
      SubscriptionPlanState[key] = resetObj[key];
    });
  },
};
