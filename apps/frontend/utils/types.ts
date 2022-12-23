import { NextPage } from 'next';
import { ReactElement } from 'react';

import { QuestionType, RoleTitle } from '@/graphql/graphql';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactElement;
};

export type Pagination = {
  offset: number;
  limit: number;
  total?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  totalPages?: number;
};

export type ResultType = {
  questionId: string;
  title: string;
  options: string[];
  isTrue: boolean;
  correctAnswer: string;
  lesson: string;
  selectedOption?: string;
  type: QuestionType;
};

export type GaugeValues = {
  [QuestionType.Easy]: number;
  [QuestionType.Medium]: number;
  [QuestionType.Hard]: number;
};

export type ContestMeta = {
  title: string;
  totalResult: number;
  questionsCount: number;
  truthyAnswersCount: number;
  falsyAnswersCount: number;
  duration: number;
};

export type SigningInput = {
  email: string;
  password: string;
};

export type SignUpInput = {
  email: string;
  password: string;
  confirmPassword: string;
  role: RoleTitle;
  agreement: boolean;
  teacherId?: string;
};

export type ConstraintsErrors = {
  isEmail?: string;
  isPasswordMatch?: string;
  isAcceptAgreement?: string;
  isStudentHasTeacher?: string;
  minLength?: string;
};

export type GraphqlResponseError = {
  constraints: ConstraintsErrors[];
};

export enum MessageRecipients {
  ALL,
  TEACHERS,
  GOLDEN_TEACHERS,
  FREE_TEACHERS,
  STUDENTS,
  STUDENTS_TEACHERS,
  FREE_STUDENTS,
}
