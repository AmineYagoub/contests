import { EmailDto, SigningDto, SignUpDto } from '@contests/dto';
import { isPublic, NonceInterceptor } from '@contests/utils';
import { UseInterceptors } from '@nestjs/common';
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

  @isPublic()
  @Mutation(() => Boolean)
  async signup(@Args('input') data: SignUpDto) {
    return this.authService.signUp(data);
  }

  @isPublic()
  @Mutation(() => Auth)
  @UseInterceptors(NonceInterceptor)
  async signing(@Args('input') input: SigningDto) {
    return await this.authService.signing(input);
  }

  @isPublic()
  @Mutation(() => Boolean)
  async resendEmailActivationCode(@Args('input') data: EmailDto) {
    return this.authService.resendEmailActivationCode(data.email);
  }

  @isPublic()
  @Mutation(() => Boolean)
  async emailTokenToRecoverPassword(@Args('input') data: EmailDto) {
    return this.authService.emailTokenToRecoverPassword(data.email);
  }

  @ResolveField(() => User)
  async user(@Parent() auth: Auth) {
    return await this.authService.getUserFromJWTToken(auth.accessToken);
  }
}
