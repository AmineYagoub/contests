import {
  Teacher,
  Membership,
  MembershipStatus,
  SubscriptionPlan,
  useFindAllSubscriptionPlansQuery,
  useUpdateTeacherSubscriptionMutation,
  useFindMembershipByProfileIdQuery,
} from '@/graphql/graphql';
import { Logger } from '@/utils/app';
import { AuthState } from '@/valtio/auth.state';
import { SubscriptionPlanActions } from '@/valtio/plans.state';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';

export const useSubscriptionPlans = () => {
  const profile = useSnapshot(AuthState).user?.profile as Teacher;
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>(null);

  const openSubscriptionForm = (el: SubscriptionPlan) => {
    SubscriptionPlanActions.setSubscriptionFormOpen(true);
    setSelectedPlan(el);
  };

  const closeSubscriptionForm = () => {
    SubscriptionPlanActions.setSubscriptionFormOpen(false);
    setSelectedPlan(null);
  };

  const openMemberShipStatus = () => {
    SubscriptionPlanActions.setMembershipDetailsOpen(true);
  };

  const closeMemberShipStatus = () => {
    SubscriptionPlanActions.setMembershipDetailsOpen(false);
    SubscriptionPlanActions.setSubscriptionFormOpen(false);
    setSelectedPlan(null);
  };

  const { data, loading } = useFindAllSubscriptionPlansQuery({
    skip: !!profile,
  });

  const {
    data: membershipData,
    loading: membershipLoad,
    refetch: refetchMembership,
  } = useFindMembershipByProfileIdQuery({
    variables: {
      id: profile?.id,
    },
    skip: !!profile,
  });

  useEffect(() => {
    SubscriptionPlanActions.setQueryLoading(true);
    if (membershipData?.findMembershipByProfileId) {
      SubscriptionPlanActions.setQueryLoading(false);
      SubscriptionPlanActions.setMembershipPlan(
        membershipData?.findMembershipByProfileId as Membership
      );
    }
  }, [membershipData]);

  const refetchData = () => {
    SubscriptionPlanActions.setQueryLoading(true);
    refetchMembership()
      .then(({ data }) => {
        SubscriptionPlanActions.setMembershipPlan(
          data?.findMembershipByProfileId as Membership
        );
      })
      .finally(() => {
        SubscriptionPlanActions.setQueryLoading(false);
      });
  };

  const [
    UpdateTeacherSubscriptionMutation,
    { loading: submitWait, error },
  ] = useUpdateTeacherSubscriptionMutation();

  const closeAllAndRefetch = async () => {
    closeMemberShipStatus();
    refetchData();
  };

  const submitSubscription = async (
    plan: SubscriptionPlan,
    disconnect = false
  ) => {
    try {
      const { data } = await UpdateTeacherSubscriptionMutation({
        variables: {
          id: profile.id,
          input: {
            planId: plan.id,
            membershipStatus: MembershipStatus.Unpaid,
            disconnect,
          },
        },
      });
      if (data?.updateTeacherSubscription) {
        SubscriptionPlanActions.setMembershipPlan(
          data?.updateTeacherSubscription.subscription as Membership
        );
        disconnect ? closeAllAndRefetch() : openMemberShipStatus();
      }
    } catch (error) {
      Logger.log(error);
    }
  };

  const methods = {
    submitSubscription,
    closeMemberShipStatus,
    openMemberShipStatus,
    openSubscriptionForm,
    closeSubscriptionForm,
  };

  return {
    error,
    data: data?.findAllSubscriptionPlans,
    methods,
    submitWait,
    selectedPlan,
    loading: loading || membershipLoad,
    personalImage: profile?.personalImage,
  };
};
