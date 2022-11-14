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
  })
  startDate: Date;

  @Field({
    description: 'Identifies the end date of the membership.',
  })
  endDate: Date;

  @Field(() => Int, {
    description: 'Identifies the number of renew times.',
  })
  renewCount: number;

  @Field(() => SubscriptionPlan, {
    description: 'Identifies the subscription plan.',
  })
  memberShipOn: SubscriptionPlan;

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
