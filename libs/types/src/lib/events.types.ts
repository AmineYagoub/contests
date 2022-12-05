import { StudentLevel } from './common.types';
import { RoleTitle } from './users.types';

export const USER_CREATED_EVENT = 'user.created';
export const USER_CHANGE_PASSWORD = 'user.updated.pwd';

export type UserMutatedEvent = {
  token: string;
  email: string;
  template: string;
  id: string;
};

export const USER_ROLE_UPDATED_EVENT = 'user.updated.role';
export type TeacherRoleMutationEvent = {
  role: RoleTitle;
  planId: string;
  profileId: string;
  membershipPeriod: number;
};

export const STUDENT_ADD_TEACHER_EVENT = 'student.update.teacher';
export type StudentUpdateTeacher = {
  name: string;
  teacherId: string;
  userId: string;
};

export const TEACHER_CONNECT_STUDENT_EVENT = 'teacher.connect.student';
export type TeacherConnectStudent = {
  name: string;
  teacherId: string;
  studentId: string;
  connect: boolean;
};

export const CONTEST_CREATED_EVENT = 'contest.created';
export type ContestCreatedEvent = {
  contestId: string;
  contestTitle: string;
  authorId: string;
  level?: StudentLevel[];
  participants?: string[];
};

export const CONTEST_PARTICIPATING_IDS_EVENT = 'contest.participating.ids';
