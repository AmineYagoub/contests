import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Csrf {
  @Field({ description: 'JWT token type' })
  csrf: string;
}
