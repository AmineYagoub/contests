import { JWTToken } from '@contests/types';
import { ObjectType } from '@nestjs/graphql';

import { User } from '../users/user.model';

@ObjectType()
export class Auth extends JWTToken {
  user: User;
}
