import {
  Teacher,
  SubscriptionPlan,
  useFindAllSubscriptionPlansQuery,
  useUpdateTeacherSubscriptionMutation,
  MembershipStatus,
  useFindMembershipByProfileIdQuery,
} from '@/graphql/graphql';
import { Logger } from '@/utils/app';
import { AuthState } from '@/valtio/auth.state';
import { useState } from 'react';
import { useSnapshot } from 'valtio';

export const useSubscriptionPlans = () => {
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const profile = useSnapshot(AuthState).user.profile as Teacher;
  const { data, loading } = useFindAllSubscriptionPlansQuery();
  const {
    data: membershipData,
    loading: membershipLoad,
  } = useFindMembershipByProfileIdQuery({
    variables: {
      id: profile.id,
    },
  });

  const [
    UpdateTeacherSubscriptionMutation,
    { loading: submitWait, error },
  ] = useUpdateTeacherSubscriptionMutation();

  const openPaymentDetails = () => {
    setShowPaymentDetails(true);
  };

  const submitSubscription = async (plan: SubscriptionPlan) => {
    try {
      const data = await UpdateTeacherSubscriptionMutation({
        variables: {
          id: profile.id,
          input: {
            planId: plan.id,
            membershipStatus: MembershipStatus.Unpaid,
          },
        },
      });
      console.log(data);
    } catch (error) {
      Logger.log(error);
    }
  };

  return {
    data,
    submitSubscription,
    loading: loading || membershipLoad,
    submitWait,
    error,
    showPaymentDetails,
    openPaymentDetails,
    membership: membershipData?.findMembershipByProfileId,
    personalImage: profile.personalImage,
  };
};
