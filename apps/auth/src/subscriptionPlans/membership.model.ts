import { MembershipStatus } from '@contests/types/auth';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { SubscriptionPlan } from './plan.model';

@ObjectType()
export class Membership {
  @Field(() => ID)
  id: string;

  @Field(() => MembershipStatus, {
    description: 'Identifies the status of the membership.',
  })
  status: MembershipStatus;

  @Field({
    description: 'Identifies the start date of the membership.',
    nullable: true,
  })
  startDate?: Date;

  @Field({
    description: 'Identifies the end date of the membership.',
    nullable: true,
  })
  endDate?: Date;

  @Field(() => Int, {
    description: 'Identifies the number of renew times.',
  })
  renewCount: number;

  @Field(() => Int, {
    description: 'Identifies the number of created contests in this period.',
  })
  contestCount: number;

  @Field(() => [SubscriptionPlan], {
    description: 'Identifies the subscription plan.',
  })
  memberShipOn: SubscriptionPlan[];

  @Field({
    description: 'Identifies the date and time when the object was created.',
  })
  created: Date;

  @Field({
    description:
      'Identifies the date and time when the object was last updated.',
  })
  updated: Date;
}
