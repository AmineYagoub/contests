import {
  UpdateDocumentsDto,
  UpdateStudentDto,
  UpdateTeacherDto,
  UpdateTeacherSubscriptionDto,
} from '@contests/dto/auth';
import { isPublic } from '@contests/utils';
import { Args, createUnionType, Mutation, Resolver } from '@nestjs/graphql';

import { User } from '../users/user.model';
import { ProfileService } from './profile.service';
import { Student } from './student.model';
import { Teacher } from './teacher.model';

export const Profile = createUnionType({
  name: 'Profile',
  types: () => [Student, Teacher] as const,
  resolveType(value) {
    if (!value.level) {
      return Teacher;
    } else {
      return Student;
    }
  },
});

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private profileService: ProfileService) {}

  @isPublic()
  @Mutation(() => User)
  async updateStudentProfile(
    @Args('id') id: string,
    @Args('input') data: UpdateStudentDto
  ) {
    return this.profileService.updateStudentProfile({ data, where: { id } });
  }

  @isPublic()
  @Mutation(() => User)
  async updateTeacherProfile(
    @Args('id') id: string,
    @Args('input') data: UpdateTeacherDto
  ) {
    return this.profileService.updateTeacherProfile({ data, where: { id } });
  }

  @isPublic()
  @Mutation(() => Teacher)
  async updateTeacherSubscription(
    @Args('id') id: string,
    @Args('input') data: UpdateTeacherSubscriptionDto
  ) {
    return this.profileService.updateTeacherSubscription({
      data,
      where: { id },
    });
  }

  @Mutation(() => User)
  async updateStudentDocuments(
    @Args('id') id: string,
    @Args('input') data: UpdateDocumentsDto
  ) {
    return this.profileService.updateStudentDocuments({ data, where: { id } });
  }
}
