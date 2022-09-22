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
  /**
   *
   * @param authService AuthService
   */
  constructor(private readonly authService: AuthService) {}

  /**
   * @param data SignUpDto
   * @returns Promise<ActivationToken>
   */
  // @Public()
  @Mutation(() => Boolean)
  async signup(@Args('input') data: SignUpDto) {
    return this.authService.signUp(data);
  }

  /**
   * Log The use in.
   *
   * @param input SigningDto
   * @returns Promise<JWTToken>
   */

  @Mutation(() => Auth)
  async signing(@Args('input') input: SigningDto) {
    return await this.authService.signing(input);
  }

  /**
   * Get user from JWT Token.
   *
   * @returns  Promise<User>
   */
  @ResolveField(() => User)
  async user(@Parent() auth: Auth) {
    return await this.authService.getUserFromJWTToken(auth.accessToken);
  }
}
