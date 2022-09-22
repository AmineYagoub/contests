import { ObjectType } from '@nestjs/graphql';

import { JWTToken } from '../jwt/jwt.model';
import { User } from '../users/user.model';

@ObjectType()
export class Auth extends JWTToken {
  user: User;
}
