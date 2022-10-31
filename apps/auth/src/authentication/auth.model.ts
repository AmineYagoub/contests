import { JWTToken } from '@contests/types/auth';
import { ObjectType } from '@nestjs/graphql';

import { User } from '../users/user.model';

@ObjectType()
export class Auth extends JWTToken {
  user: User;
}
