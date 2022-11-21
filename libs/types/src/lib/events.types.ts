import { RoleTitle } from './users.types';

export const USER_CREATED_EVENT = 'user.created';
export const USER_CHANGE_PASSWORD = 'user.updated.pwd';
export const USER_ROLE_UPDATED_EVENT = 'user.updated.role';

export type UserMutatedEvent = {
  token: string;
  email: string;
  template: string;
  id: string;
};

export type TeacherRoleMutationEvent = {
  role: RoleTitle;
  planId: string;
  profileId: string;
  membershipPeriod: number;
};
