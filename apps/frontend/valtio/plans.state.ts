import { proxy } from 'valtio';

import { Membership, SubscriptionPlan } from '@/graphql/graphql';
import { cloneDeep } from '@apollo/client/utilities';

interface SubscriptionPlanStorage {
  plans: SubscriptionPlan[];
  membershipData?: Membership;
  queryLoading: boolean;
  mutationLoading: boolean;
  subscriptionForm: boolean;
  membershipDetails: boolean;
}

const init: SubscriptionPlanStorage = {
  plans: [],
  queryLoading: false,
  membershipData: null,
  mutationLoading: false,
  subscriptionForm: false,
  membershipDetails: false,
};

export const SubscriptionPlanState = proxy<SubscriptionPlanStorage>(init);

export const SubscriptionPlanActions = {
  setSubscriptionPlans: (plans: SubscriptionPlan[]) => {
    SubscriptionPlanState.plans = plans;
  },
  setMembershipPlan: (membershipData: Membership) => {
    SubscriptionPlanState.membershipData = membershipData;
  },
  setQueryLoading: (loading: boolean) => {
    SubscriptionPlanState.queryLoading = loading;
  },
  setMutationLoading: (loading: boolean) => {
    SubscriptionPlanState.mutationLoading = loading;
  },
  setSubscriptionFormOpen: (val: boolean) => {
    SubscriptionPlanState.subscriptionForm = val;
  },
  setMembershipDetailsOpen: (val: boolean) => {
    SubscriptionPlanState.membershipDetails = val;
  },
  resetState: () => {
    const resetObj = cloneDeep(init);
    Object.keys(resetObj).forEach((key) => {
      SubscriptionPlanState[key] = resetObj[key];
    });
  },
};
