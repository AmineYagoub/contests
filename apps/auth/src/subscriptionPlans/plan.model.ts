import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Membership } from './membership.model';

@ObjectType()
export class SubscriptionPlan {
  @Field(() => ID)
  id: string;

  @Field({
    description: 'Identifies the unique title of the plan.',
  })
  title: string;

  @Field({
    description: 'Identifies the unique sub title of the plan.',
  })
  subTitle: string;

  @Field(() => Int, {
    description: 'Identifies the unique price of the plan.',
  })
  price: number;

  @Field(() => Int, {
    description:
      'Identifies the number of allowed contests that can be created in this plan.',
  })
  allowedContests: number;

  @Field(() => [Membership], {
    description:
      'Identifies the number of allowed contests that can be created in this plan.',
  })
  memberships: Membership[];

  @Field(() => Int, {
    description:
      'Identifies the number of allowed contests that can be created in this plan.',
  })
  period: number;

  @Field(() => [String], {
    description: 'Identifies a list of plan options',
  })
  options: string[];

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
