import { Question, Student, User } from '@/graphql/graphql';
import { ContestsDataIndex } from '@/hooks/admin/manage-contests.hook';

export const ContestFields: { [P in ContestsDataIndex]: P } = {
  id: 'id',
  title: 'title',
  duration: 'duration',
  level: 'level',
  answers: 'answers',
  questions: 'questions',
  countries: 'countries',
  status: 'status',
  startTime: 'startTime',
  created: 'created',
  authorId: 'authorId',
  topics: 'topics',
  maxParticipants: 'maxParticipants',
  dictationLevel: 'dictationLevel',
  published: 'published',
  participants: 'participants',
  easyQuestionCount: 'easyQuestionCount',
  mediumQuestionCount: 'mediumQuestionCount',
  hardQuestionCount: 'hardQuestionCount',
  dictationQuestionCount: 'dictationQuestionCount',
  updated: 'updated',
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
  dictationLevel: 'dictationLevel',
  created: 'created',
  updated: 'updated',
  correctAnswer: 'correctAnswer',
  lesson: 'lesson',
  topics: 'topics',
  __typename: '__typename',
};

export type StudentsDataIndex = keyof Student;
export const StudentFields: { [P in StudentsDataIndex]: P } = {
  id: 'id',
  key: 'key',
  userId: 'userId',
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
  countAllMessages: 'countAllMessages',
  countAllNotifications: 'countAllNotifications',
  messagesCount: 'messagesCount',
  notificationsCount: 'notificationsCount',
  __typename: '__typename',
};
