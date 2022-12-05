import { Module } from '@nestjs/common';

import { PrismaService } from '../app/prisma.service';
import { ProfileResolver } from './profile.resolver';
import { ProfileService } from './profile.service';
import { StudentService } from './student.service';
import { TeacherService } from './teacher.service';

@Module({
  providers: [
    ProfileResolver,
    ProfileService,
    PrismaService,
    StudentService,
    TeacherService,
  ],
})
export class ProfileModule {}
