import {
  Membership,
  MembershipStatus,
  RoleTitle,
  SubscriptionPlan,
} from '@/graphql/graphql';
import styled from '@emotion/styled';
import { List, Tag, Typography } from 'antd';
import { getMapperLabel, membershipStatusMappedTypes } from '@/utils/mapper';
import moment from 'moment-timezone';
import { formatPrice } from '@/utils/app';
import DeleteSubscription from './DeleteSubscription';
import { useSnapshot } from 'valtio';
import { SubscriptionPlanState } from '@/valtio/plans.state';
import { AuthState } from '@/valtio/auth.state';
import { useState } from 'react';

const { Item } = List;

const StyledItem = styled(Item)({
  justifyContent: 'start !important',
  gap: 20,
  '& .ant-typography': {
    width: 100,
    '&:not(.ant-typography-success) ::after': {
      content: '":"',
    },
  },
});

const MembershipData = ({
  title,
  membershipPrams,
  profileId,
}: {
  title: string;
  membershipPrams?: Membership;
  profileId?: string;
}) => {
  const subscriptionSnap = useSnapshot(SubscriptionPlanState);
  const user = useSnapshot(AuthState).user;
  const [membership, setMembership] = useState<Membership>(
    (subscriptionSnap.membershipData as Membership) || membershipPrams
  );

  return (
    <List header={<h2>{title}</h2>}>
      {membership ? (
        <>
          <StyledItem>
            <Typography.Text strong>نوع العضوية</Typography.Text>
            <Tag color="green">العضوية الذهبية</Tag>
          </StyledItem>

          <StyledItem>
            <Typography.Text strong>خطة الإشتراك</Typography.Text>
            <span>{membership.memberShipOn.title}</span>
            {(user?.role.title === RoleTitle.Admin ||
              membership.status !== MembershipStatus.Active) && (
              <DeleteSubscription
                plan={membership.memberShipOn as SubscriptionPlan}
                profileId={profileId}
                onSuccess={() => setMembership(null)}
              />
            )}
          </StyledItem>

          <StyledItem>
            <Typography.Text strong>حالة الإشتراك</Typography.Text>
            <Tag
              color={
                membership.status === MembershipStatus.Active ? 'green' : 'gold'
              }
            >
              {getMapperLabel(membershipStatusMappedTypes, membership.status)}
            </Tag>
          </StyledItem>

          <StyledItem>
            <Typography.Text strong>المبلغ المستحق</Typography.Text>

            <Typography.Text strong type="success">
              {formatPrice(
                membership.status === MembershipStatus.Active
                  ? 0
                  : membership.memberShipOn.price
              )}
            </Typography.Text>
          </StyledItem>

          <StyledItem>
            <Typography.Text strong>بداية الإشتراك</Typography.Text>
            {membership.startDate ? (
              <span>{moment(membership.startDate).fromNow()}</span>
            ) : (
              <Tag color="gold">
                {getMapperLabel(membershipStatusMappedTypes, membership.status)}
              </Tag>
            )}
          </StyledItem>
          <StyledItem>
            <Typography.Text strong>نهاية الإشتراك</Typography.Text>
            {membership.endDate ? (
              <span>{moment(membership.endDate).fromNow()}</span>
            ) : (
              <Tag color="gold">
                {getMapperLabel(membershipStatusMappedTypes, membership.status)}
              </Tag>
            )}
          </StyledItem>
        </>
      ) : (
        <StyledItem>
          <Typography.Text strong>نوع العضوية</Typography.Text>
          <Tag color="blue">العضوية المجانية</Tag>
        </StyledItem>
      )}
    </List>
  );
};

export default MembershipData;
