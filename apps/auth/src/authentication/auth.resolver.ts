import { SigningDto, SignUpDto } from '@contests/dto';
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { User } from '../users/user.model';
import { Auth } from './auth.model';
import { AuthService } from './auth.service';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Boolean)
  async signup(@Args('input') data: SignUpDto) {
    return this.authService.signUp(data);
  }

  @Mutation(() => Auth)
  async signing(@Args('input') input: SigningDto) {
    return await this.authService.signing(input);
  }

  @Mutation(() => Boolean)
  async resendEmailActivationCode(@Args('email') email: string) {
    return this.authService.resendEmailActivationCode(email);
  }

  @ResolveField(() => User)
  async user(@Parent() auth: Auth) {
    return await this.authService.getUserFromJWTToken(auth.accessToken);
  }
}
