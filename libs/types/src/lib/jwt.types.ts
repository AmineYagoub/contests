import { Field, HideField, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JWTToken {
  @Field({ description: 'JWT access token' })
  accessToken: string;

  @Field({ description: 'JWT refresh token' })
  refreshToken: string;

  @Field({ description: 'JWT token type' })
  tokenType: 'bearer';

  @HideField()
  nonce: string;
}
