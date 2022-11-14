import { registerEnumType } from '@nestjs/graphql';

export enum MembershipStatus {
  ACTIVE,
  CANCELED,
  UNPAID,
  EXPIRED,
}

registerEnumType(MembershipStatus, {
  name: 'MembershipStatus',
  description: 'Membership Status',
});
