import { users } from './users';
import { Prisma } from '@prisma/auth-service';
import { RoleTitle } from '@contests/types/auth';

export const getUsers = async (
  hashedPassword: (value: string) => Promise<string>
): Promise<{
  teachers: Prisma.UserCreateInput[];
  students: Prisma.UserCreateInput[];
}> => {
  const teachers = [];
  const students = [];

  for (const el of users) {
    const user: Prisma.UserCreateInput = {
      password: await hashedPassword(el.password),
      key: el.key,
      email: el.email,
      agreement: el.agreement,
      emailConfirmed: el.emailConfirmed,
      isActive: el.isActive,
      role: {
        connectOrCreate: {
          create: {
            title: el.role,
          },
          where: {
            title: el.role,
          },
        },
      },
    };
    if (
      [RoleTitle.STUDENT, RoleTitle.STUDENT_TEACHER].includes(
        el.role as RoleTitle
      )
    ) {
      user.profile = {
        create: {
          ...el.profile,
        },
      };
      students.push(user);
    } else {
      user.profile = {
        create: {
          firstName: el.profile.firstName,
          lastName: el.profile.lastName,
          personalImage: el.profile.personalImage,
          country: el.profile.country,
          dateOfBirth: el.profile.dateOfBirth,
        },
      };
      teachers.push(user);
    }
  }
  return { teachers, students };
};
