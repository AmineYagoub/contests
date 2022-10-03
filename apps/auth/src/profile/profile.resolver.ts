import { UpdateStudentDto } from '@contests/dto';
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

  @Mutation(() => User)
  async updateStudentProfile(
    @Args('id') id: string,
    @Args('input') data: UpdateStudentDto
  ) {
    return this.profileService.updateStudentProfile({ data, where: { id } });
  }
}
