import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';

import { User } from '../users/user.model';
import { ActivationToken } from './activationToken.model';
import { ActivationTokenService } from './activationToken.service';

@Resolver(() => ActivationToken)
export class ActivationTokenResolver {
  constructor(private activationService: ActivationTokenService) {}

  @Query(() => ActivationToken)
  findEmailToken(@Args('token') token: string) {
    return this.activationService.findUnique({ value: token });
  }

  @Mutation(() => User)
  activateEmailToken(@Args('userId') id: string) {
    return this.activationService.activateEmailToken({ id });
  }

  @Mutation(() => User)
  activatePasswordToken(@Args('userId') id: string) {
    return this.activationService.activatePasswordToken({ id });
  }

  /**
   * Resolve ActivationToken type
   *
   * @param reference
   * @returns
   */
  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: string }) {
    return this.activationService.findUnique({ id: reference.id });
  }
}
