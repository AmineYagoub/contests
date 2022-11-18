import { registerEnumType } from '@nestjs/graphql';

export enum MembershipStatus {
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
  UNPAID = 'UNPAID',
  EXPIRED = 'EXPIRED',
}

registerEnumType(MembershipStatus, {
  name: 'MembershipStatus',
  description: 'Membership Status',
});
