import { Question, Student, User } from '@/graphql/graphql';
import { ContestsDataIndex } from '@/hooks/contests/manage-contests.hook';

export const ContestFields: { [P in ContestsDataIndex]: P } = {
  id: 'id',
  title: 'title',
  duration: 'duration',
  level: 'level',
  type: 'type',
  answers: 'answers',
  questions: 'questions',
  countries: 'countries',
  status: 'status',
  startTime: 'startTime',
  created: 'created',
  authorId: 'authorId',
  tags: 'tags',
  maxParticipants: 'maxParticipants',
  published: 'published',
  participants: 'participants',
  easyQuestionCount: 'easyQuestionCount',
  mediumQuestionCount: 'mediumQuestionCount',
  hardQuestionCount: 'hardQuestionCount',
  updated: 'updated',
  user: 'user',
  __typename: '__typename',
};

export type QuestionsDataIndex = keyof Question;
export const QuestionFields: { [P in QuestionsDataIndex]: P } = {
  id: 'id',
  title: 'title',
  options: 'options',
  type: 'type',
  authorId: 'authorId',
  published: 'published',
  usedCount: 'usedCount',
  created: 'created',
  updated: 'updated',
  correctAnswer: 'correctAnswer',
  lesson: 'lesson',
  tags: 'tags',
  __typename: '__typename',
};

export type StudentsDataIndex = keyof Student;
export const StudentFields: { [P in StudentsDataIndex]: P } = {
  id: 'id',
  firstName: 'firstName',
  lastName: 'lastName',
  personalImage: 'personalImage',
  birthCertImage: 'birthCertImage',
  letterImage: 'letterImage',
  level: 'level',
  country: 'country',
  dateOfBirth: 'dateOfBirth',
  created: 'created',
  updated: 'updated',
  teacher: 'teacher',
  __typename: '__typename',
};

export type UsersDataIndex = keyof User;
export const UserFields: { [P in UsersDataIndex]: P } = {
  id: 'id',
  key: 'key',
  role: 'role',
  email: 'email',
  profile: 'profile',
  created: 'created',
  updated: 'updated',
  isActive: 'isActive',
  agreement: 'agreement',
  emailConfirmed: 'emailConfirmed',
  countUnreadMessages: 'countUnreadMessages',
  countUnreadNotifications: 'countUnreadNotifications',
  __typename: '__typename',
};
