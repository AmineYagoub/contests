import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => Int, { nullable: true })
  countUnreadMessages?: number;

  @Field(() => Int, { nullable: true })
  countUnreadNotifications?: number;
}
