import {
  Directive,
  Field,
  HideField,
  ID,
  Int,
  ObjectType,
} from '@nestjs/graphql';

import { Role } from '../authorizations/role.model';

@ObjectType()
@Directive('@key(fields: "id")')
export class User {
  @Field(() => ID)
  id: string;

  @Field({
    description: 'Identifies the first name of the user.',
    nullable: true,
  })
  firstName?: string;

  @Field({
    description: 'Identifies the last name of the user.',
    nullable: true,
  })
  lastName?: string;

  @Field({
    description: 'Identifies the unique email of the user.',
  })
  email: string;

  @Field(() => Role, {
    description: 'Identifies the role of the user.',
  })
  role?: Role;

  @Field(() => Role, {
    description: 'Identifies the role of the user.',
  })
  emailToken?: Role;

  @Field(() => User, {
    description: 'Identifies the supervisor teacher associated with that user.',
    nullable: true,
  })
  teacher?: User;

  @Field(() => Int, {
    description: 'Identifies the unique key the user.',
  })
  key: number;

  @HideField()
  password: string;

  @Field({
    description: 'Identifies the avatar of the user.',
    nullable: true,
  })
  image?: string;

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

  @Field({
    description: 'Identifies the date and time when the object was created.',
  })
  created: Date;

  @Field({
    description:
      'Identifies the date and time when the object was last updated.',
  })
  updated: Date;

  /*   
  @Field({ middleware: [checkRoleMiddleware] })
  @Extensions({ role: Role.ADMIN })
  users: premium teacher users
  
  */
}
