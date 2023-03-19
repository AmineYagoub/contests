import {
  Directive,
  Field,
  HideField,
  ID,
  Int,
  ObjectType,
} from '@nestjs/graphql';

import { Role } from '../authorizations/role.model';
import { Profile } from '../profile/profile.resolver';
import { Student } from '../profile/student.model';
import { Teacher } from '../profile/teacher.model';

@ObjectType()
@Directive('@key(fields: "id")')
export class User {
  @Field(() => ID)
  id: string;

  @Field({
    description: 'Identifies the unique email of the user.',
  })
  email: string;

  @Field(() => Role, {
    description: 'Identifies the role of the user.',
    nullable: true,
  })
  role?: Role;

  @Field(() => Profile, {
    description: 'Identifies the Profile of the user.',
    nullable: true,
  })
  profile?: Student | Teacher;

  @Field(() => Int, {
    description: 'Identifies the unique key the user.',
  })
  key: number;

  @HideField()
  password: string;

  @Field(() => Boolean, {
    description: 'Identifies if the user email is confirmed.',
  })
  emailConfirmed: boolean;

  @Field(() => Boolean, {
    description: 'Identifies if the user are accepted agreement.',
  })
  agreement: boolean;

  @Field(() => Boolean, {
    description: 'Identifies if the user is active or banned.',
    defaultValue: true,
  })
  isActive: boolean;

  @Field(() => Int, {
    description: 'Identifies the number of messages viewed by user.',
  })
  messagesCount: number;

  @Field(() => Int, {
    description: 'Identifies the number of notifications viewed by user.',
  })
  notificationsCount: number;

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
