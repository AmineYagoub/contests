import { UserPhone } from '@contests/types/auth';
import { Directive, Field, ObjectType } from '@nestjs/graphql';
import { Membership } from '../subscriptionPlans/membership.model';

import { BaseProfile } from './base.model';
import { Student } from './student.model';

@ObjectType()
@Directive('@key(fields: "id")')
export class Teacher extends BaseProfile {
  @Field(() => [Student], {
    description: 'Identifies a List of students affiliated with this teacher.',
    nullable: true,
    defaultValue: [],
  })
  students?: Student[];

  @Field(() => UserPhone, {
    description: 'Identifies the phone of the user.',
    nullable: true,
  })
  phone?: UserPhone;

  @Field(() => Membership, {
    description: 'Identifies the subscription plan of the user.',
    nullable: true,
  })
  subscription?: Membership;
}

/*
  @Field({ middleware: [checkRoleMiddleware] })
  @Extensions({ role: Role.ADMIN })
  users: premium teacher users

  */
