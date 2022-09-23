import { registerEnumType } from '@nestjs/graphql';

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
}

registerEnumType(RoleTitle, {
  name: 'RoleTitle',
  description: 'Users Roles',
});
registerEnumType(PermissionTitle, {
  name: 'PermissionTitle',
  description: 'System Permissions',
});
