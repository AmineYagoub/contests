import { UpdateUserDto, UserPaginationDto } from '@contests/dto';
import { isPublic, UserEntity } from '@contests/utils';
import { Type } from '@nestjs/common';
import {
  Args,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';

import { User } from './user.model';
import { UserService } from './user.service';

function Paginate<T>(Node: Type<T>) {
  @ObjectType({ isAbstract: true })
  abstract class PaginateType {
    @Field(() => Int)
    total: number;

    @Field(() => [Node], { nullable: true })
    data: T[];
  }
  return PaginateType;
}

@ObjectType()
class UserPaginationResponse extends Paginate(User) {}

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @isPublic()
  @Query(() => [User])
  findTeacher(@Args('name', { nullable: true }) name?: string) {
    return this.userService.findTeacher(name);
  }

  @isPublic()
  @Query(() => User)
  findUser(@Args('key', { type: () => Int }) key: number) {
    return this.userService.findUnique({ key });
  }

  @isPublic()
  @Mutation(() => User)
  async updateUser(@Args('id') id: string, @Args('input') data: UpdateUserDto) {
    delete data.confirmPassword;
    return this.userService.update({ data, where: { id } });
  }

  @isPublic()
  @Query(() => UserPaginationResponse, { nullable: true })
  async paginateUsers(@Args('params') params: UserPaginationDto) {
    return this.userService.paginate(params);
  }

  @isPublic()
  @Mutation(() => User, { nullable: true })
  async deleteUserById(@Args('id') id: string) {
    return this.userService.delete({ id });
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

  @Query(() => User)
  getAuthUser(@UserEntity() user: User) {
    return user;
  }
}
