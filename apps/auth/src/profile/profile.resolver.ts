import {
  UpdateDocumentsDto,
  UpdateStudentDto,
  UpdateTeacherDto,
  UpdateTeacherSubscriptionDto,
} from '@contests/dto/auth';
import { isPublic } from '@contests/utils';
import {
  Args,
  createUnionType,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';

import { User } from '../users/user.model';
import { ProfileService } from './profile.service';
import { Student } from './student.model';
import { StudentService } from './student.service';
import { Teacher } from './teacher.model';
import { TeacherService } from './teacher.service';

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
  constructor(
    private profileService: ProfileService,
    private studentService: StudentService,
    private teacherService: TeacherService
  ) {}

  @isPublic()
  @Mutation(() => User)
  async updateStudentProfile(
    @Args('id') id: string,
    @Args('input') data: UpdateStudentDto
  ) {
    return this.studentService.updateStudentProfile({ data, where: { id } });
  }

  @isPublic()
  @Mutation(() => User)
  async updateTeacherProfile(
    @Args('id') id: string,
    @Args('input') data: UpdateTeacherDto
  ) {
    return this.teacherService.updateTeacherProfile({ data, where: { id } });
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

  @isPublic()
  @Mutation(() => Teacher)
  async connectStudentToTeacher(
    @Args('id') id: string,
    @Args('studentId') studentId: string,
    @Args('connect', { type: () => Boolean }) connect: boolean
  ) {
    return this.profileService.connectStudentToTeacher({
      studentId,
      connect,
      where: { id },
    });
  }

  @Mutation(() => User)
  async updateStudentDocuments(
    @Args('id') id: string,
    @Args('input') data: UpdateDocumentsDto
  ) {
    return this.studentService.updateStudentDocuments({ data, where: { id } });
  }

  @Query(() => [User])
  findTeacher(@Args('name', { nullable: true }) name?: string) {
    return this.teacherService.searchTeachers(name);
  }

  @Query(() => [User])
  findStudents(
    @Args('name', { nullable: true }) name?: string,
    @Args('teacherId', { nullable: true }) teacherId?: string
  ) {
    return this.studentService.searchStudents(name, teacherId);
  }
}
