import { IDDto } from '@contests/dto/auth';
import { isPublic } from '@contests/utils';
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

  @isPublic()
  @Query(() => ActivationToken)
  findEmailToken(@Args('token') token: string) {
    return this.activationService.findUnique({ value: token });
  }

  @isPublic()
  @Mutation(() => User)
  activateEmailToken(@Args('input') data: IDDto) {
    return this.activationService.activateEmailToken({ id: data.id });
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
