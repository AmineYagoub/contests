import { RoleTitle } from '@/graphql/graphql';
import { NextRouter } from 'next/router';

export enum AppRoutes {
  Home = '/',
  Terms = '/community/terms',
  Privacy = '/community/privacy',
  About = '/community/about',
  Contact = '/community/contact',
  Blog = '/blog',
  SignIn = '/auth/sign-in',
  SignUp = '/auth/sign-up',
  SignOut = '/auth/sign-out',
  ForgotPassword = '/auth/forgot/password',
  AdminManageDashboard = '/admin/dashboard',
  AdminManageContests = '/admin/manage-contests',
  AdminManageInstructors = '/admin/manage-instructors',
  AdminManageStudents = '/admin/manage-students',
  AdminManageMessages = '/admin/manage-messages',
  AdminManageNotifications = '/admin/manage-notifications',
  AdminManageQuestions = '/admin/manage-questions',
  AdminManageSettings = '/admin/manage-settings',
  StudentDashboard = '/profile/dashboard',
  StudentProfile = '/profile/details',
  StudentContests = '/profile/contests',
  StudentMessages = '/profile/messages',
  StudentNotifications = '/profile/notifications',
  TeacherDashboard = '/teacher/dashboard',
  TeacherProfile = '/teacher/details',
  TeacherContests = '/teacher/contests',
  TeacherMessages = '/teacher/messages',
  TeacherNotifications = '/teacher/notifications',
  TeacherMembership = '/teacher/membership',
}

export const redirect = (router: NextRouter, role: RoleTitle) => {
  const path =
    role === RoleTitle.Admin
      ? AppRoutes.AdminManageDashboard
      : [RoleTitle.GoldenTeacher, RoleTitle.Teacher].includes(role)
      ? AppRoutes.TeacherDashboard
      : AppRoutes.StudentProfile;
  router.push({
    pathname: path,
  });
};

export const getContestRoute = (id: string) =>
  `${AppRoutes.StudentContests}/${id}`;
export const getContestSoonRoute = (time: string, title: string, id: string) =>
  encodeURI(
    `${AppRoutes.StudentContests}/coming-soon?time=${time}&title=${title}&id=${id}`
  );
