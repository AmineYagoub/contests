import { UpdateUserDto } from '@contests/dto';
import { UserEntity } from '@contests/utils';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';

import { User } from './user.model';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  getAuthUser(@UserEntity() user: User) {
    return user;
  }

  @Mutation(() => User)
  async updateUser(@Args('id') id: string, @Args('input') data: UpdateUserDto) {
    delete data.confirmPassword;
    return this.userService.update({ data, where: { id } });
  }

  /**
   * Resolve user type
   *
   * @param reference
   * @returns
   */
  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: string }) {
    return this.userService.findUnique({ id: reference.id });
  }
}
