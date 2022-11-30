import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum RoleTitle {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  STUDENT = 'STUDENT',
  STUDENT_TEACHER = 'STUDENT_TEACHER',
  TEACHER = 'TEACHER',
  GOLDEN_TEACHER = 'GOLDEN_TEACHER',
}

export enum PermissionTitle {
  // Dashboard pages
  ACCESS_DASHBOARD = 'ACCESS_DASHBOARD',
  VIEW_ANALYTICS = 'VIEW_ANALYTICS',
  VIEW_USERS = 'VIEW_USERS',
  VIEW_ROLES_PERMISSIONS = 'VIEW_ROLES_PERMISSIONS',
  VIEW_MESSAGES = 'VIEW_MESSAGES',
  VIEW_SETTINGS = 'VIEW_SETTINGS',

  // Teacher pages
  ACCESS_TEACHER_DASHBOARD = 'ACCESS_TEACHER_DASHBOARD',

  // Student pages
  ACCESS_STUDENT_DASHBOARD = 'ACCESS_STUDENT_DASHBOARD',

  // COMMON
  CREATE_CONTEST = 'CREATE_CONTEST',
  VIEW_CONTEST_RESULT = 'VIEW_CONTEST_RESULT',
}

registerEnumType(RoleTitle, {
  name: 'RoleTitle',
  description: 'Users Roles',
});
registerEnumType(PermissionTitle, {
  name: 'PermissionTitle',
  description: 'System Permissions',
});

@ObjectType()
export class UserPhone {
  @Field({ description: 'user phone' })
  phone: string;

  @Field({ description: 'phone international code' })
  phoneCode: string;
}
