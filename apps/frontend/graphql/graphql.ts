import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  _FieldSet: any;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type ActivationToken = {
  __typename?: 'ActivationToken';
  /** Identifies the date and time when the token was created. */
  created: Scalars['DateTime'];
  id: Scalars['ID'];
  /** Identifies the date and time when the token was updated. */
  updated: Scalars['DateTime'];
  /** Identifies the Token owner */
  user: User;
};

export type Answer = {
  __typename?: 'Answer';
  /** Identifies if this answer is annulled. */
  annulled: Scalars['Boolean'];
  /** Identifies the annulation reason. */
  annulledReason: Scalars['String'];
  /** Identifies the answer details. */
  answers: Array<SelectedAnswerObject>;
  /** Identifies contest id related to this answer. */
  contestId: Scalars['String'];
  /** Identifies the date and time when the object was created. */
  created: Scalars['DateTime'];
  id: Scalars['ID'];
  /** Identifies the date and time when the object was last updated. */
  updated: Scalars['DateTime'];
  /** Identifies the user id hwo submit this answer. */
  userId: Scalars['String'];
};

export type AnswerInput = {
  id: Scalars['String'];
};

export type Auth = {
  __typename?: 'Auth';
  /** JWT access token */
  accessToken: Scalars['String'];
  /** JWT refresh token */
  refreshToken: Scalars['String'];
  /** JWT token type */
  tokenType: Scalars['String'];
  user: User;
};

export type Contest = {
  __typename?: 'Contest';
  /** Identifies a list of answers that belongs to this contest. */
  answers: Array<Answer>;
  /** Identifies the author of the Question. */
  authorId: Scalars['Int'];
  /** Identifies a list of countries that can be allowed to join this Contest. */
  countries?: Maybe<Array<Scalars['String']>>;
  /** Identifies the date and time when the object was created. */
  created: Scalars['DateTime'];
  /** Identifies the duration of the Contest. */
  duration: Scalars['Int'];
  /** Identifies how many easy questions in the Contest. */
  easyQuestionCount: Scalars['Int'];
  /** Identifies how many hard questions in the Contest. */
  hardQuestionCount: Scalars['Int'];
  id: Scalars['ID'];
  /** Identifies a list of levels that can be join this Contest. */
  level: Array<StudentLevel>;
  /** Identifies the max number of Participants in the Contest. */
  maxParticipants?: Maybe<Scalars['Int']>;
  /** Identifies how many medium questions in the Contest. */
  mediumQuestionCount: Scalars['Int'];
  /** Identifies a list of users ids that joins this contest. */
  participants?: Maybe<Array<Scalars['String']>>;
  /** Identifies if the Question is published or not. */
  published: Scalars['Boolean'];
  /** Identifies a list of questions ids that connected to this contest. */
  questions?: Maybe<Array<Question>>;
  /** Identifies the date and time when contest started. */
  startTime: Scalars['DateTime'];
  /** Identifies the status of the Contest. */
  status: ContestStatus;
  /** Identifies a list of tags that belongs to this contest. */
  tags?: Maybe<Array<Tag>>;
  /** Identifies the title of the Contest. */
  title: Scalars['String'];
  /** Identifies the Type of this Contest. */
  type: ContestType;
  /** Identifies the date and time when the object was last updated. */
  updated: Scalars['DateTime'];
  user: User;
};

export type ContestConnectInput = {
  connect: AnswerInput;
};

export type ContestPaginationDto = {
  includeQuestions?: InputMaybe<Scalars['Boolean']>;
  orderBy?: InputMaybe<OrderContestArgs>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<WhereContestArgs>;
};

export type ContestPaginationResponse = {
  __typename?: 'ContestPaginationResponse';
  data?: Maybe<Array<Contest>>;
  total: Scalars['Int'];
};

/** Contest Status */
export enum ContestStatus {
  Closed = 'CLOSED',
  NotStarted = 'NOT_STARTED',
  Open = 'OPEN',
}

/** Contest Type */
export enum ContestType {
  Centralized = 'CENTRALIZED',
  Regional = 'REGIONAL',
  Worldwide = 'WORLDWIDE',
}

export type CreateAnswerDto = {
  annulled?: InputMaybe<Scalars['Boolean']>;
  annulledReason?: InputMaybe<Scalars['String']>;
  answers: Array<SelectedAnswerInput>;
  contest: ContestConnectInput;
  userId: Scalars['String'];
};

export type CreateContestDto = {
  authorId: Scalars['Int'];
  countries?: InputMaybe<Array<Scalars['String']>>;
  duration?: InputMaybe<Scalars['Int']>;
  easyQuestionCount: Scalars['Int'];
  hardQuestionCount: Scalars['Int'];
  level: Array<StudentLevel>;
  maxParticipants?: InputMaybe<Scalars['Int']>;
  mediumQuestionCount: Scalars['Int'];
  participants?: InputMaybe<Array<Scalars['Int']>>;
  published?: InputMaybe<Scalars['Boolean']>;
  startTime: Scalars['DateTime'];
  status: ContestStatus;
  tags: TagConnectInput;
  title: Scalars['String'];
  type: ContestType;
};

export type CreateQuestionDto = {
  authorId: Scalars['Int'];
  correctAnswer: Scalars['String'];
  lesson: Scalars['String'];
  options: Array<Scalars['String']>;
  published?: InputMaybe<Scalars['Boolean']>;
  tags: TagConnectInput;
  title: Scalars['String'];
  type: QuestionType;
};

export type EmailDto = {
  email: Scalars['String'];
};

export type IdDto = {
  id: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  activateEmailToken: User;
  createAnswer: Answer;
  createContest: Contest;
  createQuestion: Question;
  createTag: Tag;
  deleteAnswerById?: Maybe<Answer>;
  deleteContestById?: Maybe<Contest>;
  deleteQuestionById?: Maybe<Question>;
  deleteTagById?: Maybe<Tag>;
  emailTokenToRecoverPassword: Scalars['Boolean'];
  resendEmailActivationCode: Scalars['Boolean'];
  signing: Auth;
  signup: Scalars['Boolean'];
  updateAnswer: Answer;
  updateContest: Contest;
  updateQuestion: Question;
  updateTag: Tag;
  updateUser: User;
};

export type MutationActivateEmailTokenArgs = {
  input: IdDto;
};

export type MutationCreateAnswerArgs = {
  data: CreateAnswerDto;
};

export type MutationCreateContestArgs = {
  input: CreateContestDto;
};

export type MutationCreateQuestionArgs = {
  input: CreateQuestionDto;
};

export type MutationCreateTagArgs = {
  title: Scalars['String'];
};

export type MutationDeleteAnswerByIdArgs = {
  id: Scalars['String'];
};

export type MutationDeleteContestByIdArgs = {
  id: Scalars['String'];
};

export type MutationDeleteQuestionByIdArgs = {
  id: Scalars['String'];
};

export type MutationDeleteTagByIdArgs = {
  id: Scalars['String'];
};

export type MutationEmailTokenToRecoverPasswordArgs = {
  input: EmailDto;
};

export type MutationResendEmailActivationCodeArgs = {
  input: EmailDto;
};

export type MutationSigningArgs = {
  input: SigningDto;
};

export type MutationSignupArgs = {
  input: SignUpDto;
};

export type MutationUpdateAnswerArgs = {
  data: UpdateAnswerDto;
  id: Scalars['String'];
};

export type MutationUpdateContestArgs = {
  id: Scalars['String'];
  input: UpdateContestDto;
};

export type MutationUpdateQuestionArgs = {
  id: Scalars['String'];
  input: UpdateQuestionDto;
};

export type MutationUpdateTagArgs = {
  id: Scalars['String'];
  title: Scalars['String'];
};

export type MutationUpdateUserArgs = {
  id: Scalars['String'];
  input: UpdateUserDto;
};

/** OrderBy Type */
export enum OrderByType {
  Asc = 'Asc',
  Desc = 'Desc',
}

export type OrderContestArgs = {
  created?: InputMaybe<OrderByType>;
  duration?: InputMaybe<OrderByType>;
  participants?: InputMaybe<OrderByType>;
  startTime?: InputMaybe<OrderByType>;
};

export type OrderQuestionArgs = {
  created?: InputMaybe<OrderByType>;
  options?: InputMaybe<OrderByType>;
  usedCount?: InputMaybe<OrderByType>;
};

export type Permission = {
  __typename?: 'Permission';
  /** Identifies the description of the Permission. */
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Identifies the unique name of the Permission. */
  title: PermissionTitle;
};

/** System Permissions */
export enum PermissionTitle {
  AccessDashboard = 'ACCESS_DASHBOARD',
  ViewAnalytics = 'VIEW_ANALYTICS',
  ViewMessages = 'VIEW_MESSAGES',
  ViewRolesPermissions = 'VIEW_ROLES_PERMISSIONS',
  ViewSettings = 'VIEW_SETTINGS',
  ViewUsers = 'VIEW_USERS',
}

export type Query = {
  __typename?: 'Query';
  findEmailToken: ActivationToken;
  findOneAnswerById?: Maybe<Answer>;
  findOneContestById?: Maybe<Contest>;
  findOneQuestionById?: Maybe<Question>;
  findOneTagById?: Maybe<Tag>;
  findTags?: Maybe<Array<Tag>>;
  getAuthUser: User;
  paginateContest?: Maybe<ContestPaginationResponse>;
  paginateQuestions?: Maybe<QuestionPaginationResponse>;
};

export type QueryFindEmailTokenArgs = {
  token: Scalars['String'];
};

export type QueryFindOneAnswerByIdArgs = {
  id: Scalars['String'];
};

export type QueryFindOneContestByIdArgs = {
  answerId?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
};

export type QueryFindOneQuestionByIdArgs = {
  id: Scalars['String'];
};

export type QueryFindOneTagByIdArgs = {
  id: Scalars['String'];
};

export type QueryFindTagsArgs = {
  title: Scalars['String'];
};

export type QueryPaginateContestArgs = {
  params: ContestPaginationDto;
};

export type QueryPaginateQuestionsArgs = {
  params: QuestionPaginationDto;
};

export type Question = {
  __typename?: 'Question';
  /** Identifies the author of the Question. */
  authorId: Scalars['Int'];
  /** Identifies the correct answer for this Question. */
  correctAnswer?: Maybe<Scalars['String']>;
  /** Identifies the date and time when the object was created. */
  created: Scalars['DateTime'];
  id: Scalars['ID'];
  /** Identifies the lesson learned from this Question. */
  lesson: Scalars['String'];
  /** Identifies a list of answers of this Question. */
  options: Array<Scalars['String']>;
  /** Identifies if the Question is published or not. */
  published: Scalars['Boolean'];
  /** Identifies a list of tags that belongs to this Question. */
  tags?: Maybe<Array<Tag>>;
  /** Identifies the title of the Question. */
  title: Scalars['String'];
  /** Identifies the Type of this Question. */
  type: QuestionType;
  /** Identifies the date and time when the object was last updated. */
  updated: Scalars['DateTime'];
  /** Identifies how many questions in the Question. */
  usedCount?: Maybe<Scalars['Int']>;
};

export type QuestionPaginationDto = {
  orderBy?: InputMaybe<OrderQuestionArgs>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<WhereQuestionArgs>;
};

export type QuestionPaginationResponse = {
  __typename?: 'QuestionPaginationResponse';
  data?: Maybe<Array<Question>>;
  total: Scalars['Int'];
};

/** Question Type */
export enum QuestionType {
  Easy = 'EASY',
  Hard = 'HARD',
  Medium = 'MEDIUM',
}

export type Role = {
  __typename?: 'Role';
  /** Identifies the description of the role. */
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Identifies list of permissions associated whit this role. */
  permissions?: Maybe<Array<Permission>>;
  /** Identifies the unique name of the role. */
  title: RoleTitle;
};

/** Users Roles */
export enum RoleTitle {
  Admin = 'ADMIN',
  GoldenTeacher = 'GOLDEN_TEACHER',
  Moderator = 'MODERATOR',
  Student = 'STUDENT',
  StudentTeacher = 'STUDENT_TEACHER',
  Teacher = 'TEACHER',
}

export type SelectedAnswerInput = {
  /** Identifies the option selected by the user. */
  option: Scalars['String'];
  /** Identifies the index of the option selected by the user. */
  optionIndex: Scalars['Int'];
  /** Identifies the random list of options as received. */
  options: Array<Scalars['String']>;
  /** Identifies the id of the question. */
  questionId: Scalars['String'];
  /** Identifies the index of the question in the contest.questions Array. */
  questionIndex: Scalars['Int'];
};

export type SelectedAnswerObject = {
  __typename?: 'SelectedAnswerObject';
  /** Identifies the option selected by the user. */
  option: Scalars['String'];
  /** Identifies the index of the option selected by the user. */
  optionIndex: Scalars['Int'];
  /** Identifies the random list of options as received. */
  options: Array<Scalars['String']>;
  /** Identifies the id of the question. */
  questionId: Scalars['String'];
  /** Identifies the index of the question in the contest.questions Array. */
  questionIndex: Scalars['Int'];
};

export type SignUpDto = {
  agreement: Scalars['Boolean'];
  confirmPassword: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  role: RoleTitle;
  teacherId?: InputMaybe<Scalars['String']>;
};

export type SigningDto = {
  email: Scalars['String'];
  password: Scalars['String'];
};

/** Student Level */
export enum StudentLevel {
  Eighteen = 'Eighteen',
  Fifteen = 'Fifteen',
  Fourteen = 'Fourteen',
  Nineteen = 'Nineteen',
  Seventeen = 'Seventeen',
  Sixteen = 'Sixteen',
  Thirteen = 'Thirteen',
}

export type Tag = {
  __typename?: 'Tag';
  /** Identifies the date and time when the object was created. */
  created: Scalars['DateTime'];
  id: Scalars['ID'];
  /** Identifies the title of the Tag. */
  title: Scalars['String'];
  /** Identifies the date and time when the object was last updated. */
  updated: Scalars['DateTime'];
};

export type TagConnectInput = {
  connectOrCreate: Array<TagCreateInput>;
};

export type TagCreateInput = {
  create: TagInput;
  where: TagInput;
};

export type TagInput = {
  title: Scalars['String'];
};

export type UpdateAnswerDto = {
  annulled?: InputMaybe<Scalars['Boolean']>;
  annulledReason?: InputMaybe<Scalars['String']>;
  answers?: InputMaybe<Array<SelectedAnswerInput>>;
  contest?: InputMaybe<ContestConnectInput>;
  userId?: InputMaybe<Scalars['String']>;
};

export type UpdateContestDto = {
  authorId?: InputMaybe<Scalars['Int']>;
  countries?: InputMaybe<Array<Scalars['String']>>;
  duration?: InputMaybe<Scalars['Int']>;
  easyQuestionCount?: InputMaybe<Scalars['Int']>;
  hardQuestionCount?: InputMaybe<Scalars['Int']>;
  level?: InputMaybe<Array<StudentLevel>>;
  maxParticipants?: InputMaybe<Scalars['Int']>;
  mediumQuestionCount?: InputMaybe<Scalars['Int']>;
  participants?: InputMaybe<Array<Scalars['Int']>>;
  published?: InputMaybe<Scalars['Boolean']>;
  startTime?: InputMaybe<Scalars['DateTime']>;
  status?: InputMaybe<ContestStatus>;
  tags?: InputMaybe<TagConnectInput>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<ContestType>;
};

export type UpdateQuestionDto = {
  authorId?: InputMaybe<Scalars['Int']>;
  correctAnswer?: InputMaybe<Scalars['String']>;
  lesson?: InputMaybe<Scalars['String']>;
  options?: InputMaybe<Array<Scalars['String']>>;
  published?: InputMaybe<Scalars['Boolean']>;
  tags?: InputMaybe<TagConnectInput>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<QuestionType>;
  usedCount?: InputMaybe<Scalars['Int']>;
};

export type UpdateUserDto = {
  agreement?: InputMaybe<Scalars['Boolean']>;
  confirmPassword?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleTitle>;
  teacherId?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  /** Identifies if the user are accepted agreement. */
  agreement: Scalars['Boolean'];
  countUnreadMessages?: Maybe<Scalars['Int']>;
  countUnreadNotifications?: Maybe<Scalars['Int']>;
  /** Identifies the date and time when the object was created. */
  created: Scalars['DateTime'];
  /** Identifies the unique email of the user. */
  email: Scalars['String'];
  /** Identifies if the user email is confirmed. */
  emailConfirmed: Scalars['Boolean'];
  /** Identifies the role of the user. */
  emailToken: Role;
  /** Identifies the first name of the user. */
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Identifies the avatar of the user. */
  image?: Maybe<Scalars['String']>;
  /** Identifies if the user is active or banned. */
  isActive: Scalars['Boolean'];
  /** Identifies the unique key the user. */
  key: Scalars['Int'];
  /** Identifies the last name of the user. */
  lastName?: Maybe<Scalars['String']>;
  /** Identifies the role of the user. */
  role: Role;
  /** Identifies the supervisor teacher associated with that user. */
  teacher?: Maybe<User>;
  /** Identifies the date and time when the object was last updated. */
  updated: Scalars['DateTime'];
};

export type WhereContestArgs = {
  countries?: InputMaybe<Array<Scalars['String']>>;
  created?: InputMaybe<Array<Scalars['String']>>;
  level?: InputMaybe<Array<StudentLevel>>;
  participants?: InputMaybe<Array<Scalars['Int']>>;
  startTime?: InputMaybe<Array<Scalars['String']>>;
  status?: InputMaybe<ContestStatus>;
  tags?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<ContestType>;
};

export type WhereQuestionArgs = {
  correctAnswer?: InputMaybe<Scalars['String']>;
  created?: InputMaybe<Array<Scalars['String']>>;
  lesson?: InputMaybe<Scalars['String']>;
  options?: InputMaybe<Array<Scalars['String']>>;
  tags?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<QuestionType>;
};

export type CreateAnswerMutationVariables = Exact<{
  data: CreateAnswerDto;
}>;

export type CreateAnswerMutation = {
  __typename?: 'Mutation';
  createAnswer: {
    __typename?: 'Answer';
    id: string;
    created: any;
    updated: any;
  };
};

export type UpdateAnswerMutationVariables = Exact<{
  id: Scalars['String'];
  data: UpdateAnswerDto;
}>;

export type UpdateAnswerMutation = {
  __typename?: 'Mutation';
  updateAnswer: {
    __typename?: 'Answer';
    id: string;
    created: any;
    updated: any;
  };
};

export type FindOneAnswerByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type FindOneAnswerByIdQuery = {
  __typename?: 'Query';
  findOneAnswerById?: {
    __typename?: 'Answer';
    userId: string;
    annulled: boolean;
    annulledReason: string;
    created: any;
    updated: any;
    answers: Array<{
      __typename?: 'SelectedAnswerObject';
      questionId: string;
      questionIndex: number;
      optionIndex: number;
    }>;
  } | null;
};

export type ActivateEmailTokenMutationVariables = Exact<{
  input: IdDto;
}>;

export type ActivateEmailTokenMutation = {
  __typename?: 'Mutation';
  activateEmailToken: { __typename?: 'User'; id: string };
};

export type ResendEmailActivationCodeMutationVariables = Exact<{
  input: EmailDto;
}>;

export type ResendEmailActivationCodeMutation = {
  __typename?: 'Mutation';
  resendEmailActivationCode: boolean;
};

export type EmailTokenToRecoverPasswordMutationVariables = Exact<{
  input: EmailDto;
}>;

export type EmailTokenToRecoverPasswordMutation = {
  __typename?: 'Mutation';
  emailTokenToRecoverPassword: boolean;
};

export type SigningMutationVariables = Exact<{
  input: SigningDto;
}>;

export type SigningMutation = {
  __typename?: 'Mutation';
  signing: {
    __typename?: 'Auth';
    accessToken: string;
    refreshToken: string;
    tokenType: string;
  };
};

export type SignUpMutationVariables = Exact<{
  input: SignUpDto;
}>;

export type SignUpMutation = { __typename?: 'Mutation'; signup: boolean };

export type FindEmailTokenQueryVariables = Exact<{
  token: Scalars['String'];
}>;

export type FindEmailTokenQuery = {
  __typename?: 'Query';
  findEmailToken: {
    __typename?: 'ActivationToken';
    id: string;
    created: any;
    updated: any;
    user: { __typename?: 'User'; id: string; email: string };
  };
};

export type CreateContestMutationVariables = Exact<{
  input: CreateContestDto;
}>;

export type CreateContestMutation = {
  __typename?: 'Mutation';
  createContest: {
    __typename?: 'Contest';
    id: string;
    title: string;
    level: Array<StudentLevel>;
    status: ContestStatus;
    startTime: any;
    published: boolean;
    created: any;
    updated: any;
  };
};

export type DeleteContestMutationVariables = Exact<{
  id: Scalars['String'];
}>;

export type DeleteContestMutation = {
  __typename?: 'Mutation';
  deleteContestById?: { __typename?: 'Contest'; id: string } | null;
};

export type UpdateContestMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateContestDto;
}>;

export type UpdateContestMutation = {
  __typename?: 'Mutation';
  updateContest: {
    __typename?: 'Contest';
    id: string;
    title: string;
    duration: number;
    published: boolean;
    level: Array<StudentLevel>;
    created: any;
    updated: any;
    status: ContestStatus;
    authorId: number;
    startTime: any;
    easyQuestionCount: number;
    mediumQuestionCount: number;
    hardQuestionCount: number;
    participants?: Array<string> | null;
  };
};

export type FindByIdForExamQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type FindByIdForExamQuery = {
  __typename?: 'Query';
  findOneContestById?: {
    __typename?: 'Contest';
    id: string;
    type: ContestType;
    title: string;
    level: Array<StudentLevel>;
    duration: number;
    published: boolean;
    countries?: Array<string> | null;
    created: any;
    updated: any;
    status: ContestStatus;
    authorId: number;
    startTime: any;
    participants?: Array<string> | null;
    easyQuestionCount: number;
    mediumQuestionCount: number;
    hardQuestionCount: number;
    maxParticipants?: number | null;
    tags?: Array<{ __typename?: 'Tag'; title: string }> | null;
    questions?: Array<{
      __typename?: 'Question';
      id: string;
      title: string;
      options: Array<string>;
      type: QuestionType;
    }> | null;
  } | null;
};

export type FindByIdForReviewQueryVariables = Exact<{
  id: Scalars['String'];
  answerId?: InputMaybe<Scalars['String']>;
}>;

export type FindByIdForReviewQuery = {
  __typename?: 'Query';
  findOneContestById?: {
    __typename?: 'Contest';
    id: string;
    type: ContestType;
    title: string;
    level: Array<StudentLevel>;
    duration: number;
    published: boolean;
    countries?: Array<string> | null;
    created: any;
    updated: any;
    status: ContestStatus;
    authorId: number;
    startTime: any;
    participants?: Array<string> | null;
    easyQuestionCount: number;
    mediumQuestionCount: number;
    hardQuestionCount: number;
    maxParticipants?: number | null;
    tags?: Array<{ __typename?: 'Tag'; title: string }> | null;
    questions?: Array<{
      __typename?: 'Question';
      id: string;
      title: string;
      options: Array<string>;
      type: QuestionType;
      correctAnswer?: string | null;
      usedCount?: number | null;
      lesson: string;
      tags?: Array<{ __typename?: 'Tag'; title: string }> | null;
    }> | null;
    answers: Array<{
      __typename?: 'Answer';
      id: string;
      contestId: string;
      userId: string;
      annulled: boolean;
      annulledReason: string;
      created: any;
      updated: any;
      answers: Array<{
        __typename?: 'SelectedAnswerObject';
        questionId: string;
        option: string;
        options: Array<string>;
      }>;
    }>;
  } | null;
};

export type PaginateContestsQueryVariables = Exact<{
  params: ContestPaginationDto;
}>;

export type PaginateContestsQuery = {
  __typename?: 'Query';
  paginateContest?: {
    __typename?: 'ContestPaginationResponse';
    total: number;
    data?: Array<{
      __typename?: 'Contest';
      id: string;
      type: ContestType;
      title: string;
      level: Array<StudentLevel>;
      duration: number;
      published: boolean;
      countries?: Array<string> | null;
      created: any;
      updated: any;
      status: ContestStatus;
      authorId: number;
      startTime: any;
      participants?: Array<string> | null;
      easyQuestionCount: number;
      mediumQuestionCount: number;
      hardQuestionCount: number;
      maxParticipants?: number | null;
      tags?: Array<{ __typename?: 'Tag'; title: string }> | null;
    }> | null;
  } | null;
};

export type CreateQuestionMutationVariables = Exact<{
  input: CreateQuestionDto;
}>;

export type CreateQuestionMutation = {
  __typename?: 'Mutation';
  createQuestion: {
    __typename?: 'Question';
    id: string;
    type: QuestionType;
    title: string;
    options: Array<string>;
    authorId: number;
    usedCount?: number | null;
    published: boolean;
    created: any;
    updated: any;
  };
};

export type DeleteQuestionMutationVariables = Exact<{
  id: Scalars['String'];
}>;

export type DeleteQuestionMutation = {
  __typename?: 'Mutation';
  deleteQuestionById?: { __typename?: 'Question'; id: string } | null;
};

export type UpdateQuestionMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateQuestionDto;
}>;

export type UpdateQuestionMutation = {
  __typename?: 'Mutation';
  updateQuestion: {
    __typename?: 'Question';
    id: string;
    type: QuestionType;
    title: string;
    options: Array<string>;
    authorId: number;
    usedCount?: number | null;
    published: boolean;
    created: any;
    updated: any;
  };
};

export type PaginateQuestionsQueryVariables = Exact<{
  params: QuestionPaginationDto;
}>;

export type PaginateQuestionsQuery = {
  __typename?: 'Query';
  paginateQuestions?: {
    __typename?: 'QuestionPaginationResponse';
    total: number;
    data?: Array<{
      __typename?: 'Question';
      id: string;
      title: string;
      type: QuestionType;
      options: Array<string>;
      lesson: string;
      correctAnswer?: string | null;
      created: any;
      updated: any;
      authorId: number;
      usedCount?: number | null;
      tags?: Array<{ __typename?: 'Tag'; title: string }> | null;
    }> | null;
  } | null;
};

export type FindTagsQueryVariables = Exact<{
  title: Scalars['String'];
}>;

export type FindTagsQuery = {
  __typename?: 'Query';
  findTags?: Array<{ __typename?: 'Tag'; title: string }> | null;
};

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateUserDto;
}>;

export type UpdateUserMutation = {
  __typename?: 'Mutation';
  updateUser: { __typename?: 'User'; id: string; email: string };
};

export type GetAuthUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetAuthUserQuery = {
  __typename?: 'Query';
  getAuthUser: {
    __typename?: 'User';
    id: string;
    key: number;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    isActive: boolean;
    emailConfirmed: boolean;
    image?: string | null;
    role: { __typename?: 'Role'; title: RoleTitle };
  };
};

export const CreateAnswerDocument = gql`
  mutation CreateAnswer($data: CreateAnswerDto!) {
    createAnswer(data: $data) {
      id
      created
      updated
    }
  }
`;
export type CreateAnswerMutationFn = Apollo.MutationFunction<
  CreateAnswerMutation,
  CreateAnswerMutationVariables
>;

/**
 * __useCreateAnswerMutation__
 *
 * To run a mutation, you first call `useCreateAnswerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAnswerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAnswerMutation, { data, loading, error }] = useCreateAnswerMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateAnswerMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateAnswerMutation,
    CreateAnswerMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateAnswerMutation,
    CreateAnswerMutationVariables
  >(CreateAnswerDocument, options);
}
export type CreateAnswerMutationHookResult = ReturnType<
  typeof useCreateAnswerMutation
>;
export type CreateAnswerMutationResult =
  Apollo.MutationResult<CreateAnswerMutation>;
export type CreateAnswerMutationOptions = Apollo.BaseMutationOptions<
  CreateAnswerMutation,
  CreateAnswerMutationVariables
>;
export const UpdateAnswerDocument = gql`
  mutation UpdateAnswer($id: String!, $data: UpdateAnswerDto!) {
    updateAnswer(id: $id, data: $data) {
      id
      created
      updated
    }
  }
`;
export type UpdateAnswerMutationFn = Apollo.MutationFunction<
  UpdateAnswerMutation,
  UpdateAnswerMutationVariables
>;

/**
 * __useUpdateAnswerMutation__
 *
 * To run a mutation, you first call `useUpdateAnswerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAnswerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAnswerMutation, { data, loading, error }] = useUpdateAnswerMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateAnswerMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateAnswerMutation,
    UpdateAnswerMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateAnswerMutation,
    UpdateAnswerMutationVariables
  >(UpdateAnswerDocument, options);
}
export type UpdateAnswerMutationHookResult = ReturnType<
  typeof useUpdateAnswerMutation
>;
export type UpdateAnswerMutationResult =
  Apollo.MutationResult<UpdateAnswerMutation>;
export type UpdateAnswerMutationOptions = Apollo.BaseMutationOptions<
  UpdateAnswerMutation,
  UpdateAnswerMutationVariables
>;
export const FindOneAnswerByIdDocument = gql`
  query FindOneAnswerById($id: String!) {
    findOneAnswerById(id: $id) {
      userId
      answers {
        questionId
        questionIndex
        optionIndex
      }
      annulled
      annulledReason
      created
      updated
    }
  }
`;

/**
 * __useFindOneAnswerByIdQuery__
 *
 * To run a query within a React component, call `useFindOneAnswerByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneAnswerByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneAnswerByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindOneAnswerByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindOneAnswerByIdQuery,
    FindOneAnswerByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindOneAnswerByIdQuery,
    FindOneAnswerByIdQueryVariables
  >(FindOneAnswerByIdDocument, options);
}
export function useFindOneAnswerByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindOneAnswerByIdQuery,
    FindOneAnswerByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindOneAnswerByIdQuery,
    FindOneAnswerByIdQueryVariables
  >(FindOneAnswerByIdDocument, options);
}
export type FindOneAnswerByIdQueryHookResult = ReturnType<
  typeof useFindOneAnswerByIdQuery
>;
export type FindOneAnswerByIdLazyQueryHookResult = ReturnType<
  typeof useFindOneAnswerByIdLazyQuery
>;
export type FindOneAnswerByIdQueryResult = Apollo.QueryResult<
  FindOneAnswerByIdQuery,
  FindOneAnswerByIdQueryVariables
>;
export const ActivateEmailTokenDocument = gql`
  mutation ActivateEmailToken($input: IDDto!) {
    activateEmailToken(input: $input) {
      id
    }
  }
`;
export type ActivateEmailTokenMutationFn = Apollo.MutationFunction<
  ActivateEmailTokenMutation,
  ActivateEmailTokenMutationVariables
>;

/**
 * __useActivateEmailTokenMutation__
 *
 * To run a mutation, you first call `useActivateEmailTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateEmailTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateEmailTokenMutation, { data, loading, error }] = useActivateEmailTokenMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useActivateEmailTokenMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ActivateEmailTokenMutation,
    ActivateEmailTokenMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ActivateEmailTokenMutation,
    ActivateEmailTokenMutationVariables
  >(ActivateEmailTokenDocument, options);
}
export type ActivateEmailTokenMutationHookResult = ReturnType<
  typeof useActivateEmailTokenMutation
>;
export type ActivateEmailTokenMutationResult =
  Apollo.MutationResult<ActivateEmailTokenMutation>;
export type ActivateEmailTokenMutationOptions = Apollo.BaseMutationOptions<
  ActivateEmailTokenMutation,
  ActivateEmailTokenMutationVariables
>;
export const ResendEmailActivationCodeDocument = gql`
  mutation ResendEmailActivationCode($input: EmailDto!) {
    resendEmailActivationCode(input: $input)
  }
`;
export type ResendEmailActivationCodeMutationFn = Apollo.MutationFunction<
  ResendEmailActivationCodeMutation,
  ResendEmailActivationCodeMutationVariables
>;

/**
 * __useResendEmailActivationCodeMutation__
 *
 * To run a mutation, you first call `useResendEmailActivationCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendEmailActivationCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendEmailActivationCodeMutation, { data, loading, error }] = useResendEmailActivationCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResendEmailActivationCodeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ResendEmailActivationCodeMutation,
    ResendEmailActivationCodeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ResendEmailActivationCodeMutation,
    ResendEmailActivationCodeMutationVariables
  >(ResendEmailActivationCodeDocument, options);
}
export type ResendEmailActivationCodeMutationHookResult = ReturnType<
  typeof useResendEmailActivationCodeMutation
>;
export type ResendEmailActivationCodeMutationResult =
  Apollo.MutationResult<ResendEmailActivationCodeMutation>;
export type ResendEmailActivationCodeMutationOptions =
  Apollo.BaseMutationOptions<
    ResendEmailActivationCodeMutation,
    ResendEmailActivationCodeMutationVariables
  >;
export const EmailTokenToRecoverPasswordDocument = gql`
  mutation EmailTokenToRecoverPassword($input: EmailDto!) {
    emailTokenToRecoverPassword(input: $input)
  }
`;
export type EmailTokenToRecoverPasswordMutationFn = Apollo.MutationFunction<
  EmailTokenToRecoverPasswordMutation,
  EmailTokenToRecoverPasswordMutationVariables
>;

/**
 * __useEmailTokenToRecoverPasswordMutation__
 *
 * To run a mutation, you first call `useEmailTokenToRecoverPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEmailTokenToRecoverPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [emailTokenToRecoverPasswordMutation, { data, loading, error }] = useEmailTokenToRecoverPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEmailTokenToRecoverPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    EmailTokenToRecoverPasswordMutation,
    EmailTokenToRecoverPasswordMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    EmailTokenToRecoverPasswordMutation,
    EmailTokenToRecoverPasswordMutationVariables
  >(EmailTokenToRecoverPasswordDocument, options);
}
export type EmailTokenToRecoverPasswordMutationHookResult = ReturnType<
  typeof useEmailTokenToRecoverPasswordMutation
>;
export type EmailTokenToRecoverPasswordMutationResult =
  Apollo.MutationResult<EmailTokenToRecoverPasswordMutation>;
export type EmailTokenToRecoverPasswordMutationOptions =
  Apollo.BaseMutationOptions<
    EmailTokenToRecoverPasswordMutation,
    EmailTokenToRecoverPasswordMutationVariables
  >;
export const SigningDocument = gql`
  mutation Signing($input: SigningDto!) {
    signing(input: $input) {
      accessToken
      refreshToken
      tokenType
    }
  }
`;
export type SigningMutationFn = Apollo.MutationFunction<
  SigningMutation,
  SigningMutationVariables
>;

/**
 * __useSigningMutation__
 *
 * To run a mutation, you first call `useSigningMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSigningMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signingMutation, { data, loading, error }] = useSigningMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSigningMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SigningMutation,
    SigningMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SigningMutation, SigningMutationVariables>(
    SigningDocument,
    options
  );
}
export type SigningMutationHookResult = ReturnType<typeof useSigningMutation>;
export type SigningMutationResult = Apollo.MutationResult<SigningMutation>;
export type SigningMutationOptions = Apollo.BaseMutationOptions<
  SigningMutation,
  SigningMutationVariables
>;
export const SignUpDocument = gql`
  mutation SignUp($input: SignUpDto!) {
    signup(input: $input)
  }
`;
export type SignUpMutationFn = Apollo.MutationFunction<
  SignUpMutation,
  SignUpMutationVariables
>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignUpMutation,
    SignUpMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(
    SignUpDocument,
    options
  );
}
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<
  SignUpMutation,
  SignUpMutationVariables
>;
export const FindEmailTokenDocument = gql`
  query FindEmailToken($token: String!) {
    findEmailToken(token: $token) {
      id
      created
      updated
      user {
        id
        email
      }
    }
  }
`;

/**
 * __useFindEmailTokenQuery__
 *
 * To run a query within a React component, call `useFindEmailTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindEmailTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindEmailTokenQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useFindEmailTokenQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindEmailTokenQuery,
    FindEmailTokenQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindEmailTokenQuery, FindEmailTokenQueryVariables>(
    FindEmailTokenDocument,
    options
  );
}
export function useFindEmailTokenLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindEmailTokenQuery,
    FindEmailTokenQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindEmailTokenQuery, FindEmailTokenQueryVariables>(
    FindEmailTokenDocument,
    options
  );
}
export type FindEmailTokenQueryHookResult = ReturnType<
  typeof useFindEmailTokenQuery
>;
export type FindEmailTokenLazyQueryHookResult = ReturnType<
  typeof useFindEmailTokenLazyQuery
>;
export type FindEmailTokenQueryResult = Apollo.QueryResult<
  FindEmailTokenQuery,
  FindEmailTokenQueryVariables
>;
export const CreateContestDocument = gql`
  mutation CreateContest($input: CreateContestDto!) {
    createContest(input: $input) {
      id
      title
      level
      status
      startTime
      published
      created
      updated
    }
  }
`;
export type CreateContestMutationFn = Apollo.MutationFunction<
  CreateContestMutation,
  CreateContestMutationVariables
>;

/**
 * __useCreateContestMutation__
 *
 * To run a mutation, you first call `useCreateContestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateContestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createContestMutation, { data, loading, error }] = useCreateContestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateContestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateContestMutation,
    CreateContestMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateContestMutation,
    CreateContestMutationVariables
  >(CreateContestDocument, options);
}
export type CreateContestMutationHookResult = ReturnType<
  typeof useCreateContestMutation
>;
export type CreateContestMutationResult =
  Apollo.MutationResult<CreateContestMutation>;
export type CreateContestMutationOptions = Apollo.BaseMutationOptions<
  CreateContestMutation,
  CreateContestMutationVariables
>;
export const DeleteContestDocument = gql`
  mutation DeleteContest($id: String!) {
    deleteContestById(id: $id) {
      id
    }
  }
`;
export type DeleteContestMutationFn = Apollo.MutationFunction<
  DeleteContestMutation,
  DeleteContestMutationVariables
>;

/**
 * __useDeleteContestMutation__
 *
 * To run a mutation, you first call `useDeleteContestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteContestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteContestMutation, { data, loading, error }] = useDeleteContestMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteContestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteContestMutation,
    DeleteContestMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteContestMutation,
    DeleteContestMutationVariables
  >(DeleteContestDocument, options);
}
export type DeleteContestMutationHookResult = ReturnType<
  typeof useDeleteContestMutation
>;
export type DeleteContestMutationResult =
  Apollo.MutationResult<DeleteContestMutation>;
export type DeleteContestMutationOptions = Apollo.BaseMutationOptions<
  DeleteContestMutation,
  DeleteContestMutationVariables
>;
export const UpdateContestDocument = gql`
  mutation UpdateContest($id: String!, $input: UpdateContestDto!) {
    updateContest(id: $id, input: $input) {
      id
      title
      duration
      published
      level
      created
      updated
      status
      authorId
      startTime
      easyQuestionCount
      mediumQuestionCount
      hardQuestionCount
      participants
    }
  }
`;
export type UpdateContestMutationFn = Apollo.MutationFunction<
  UpdateContestMutation,
  UpdateContestMutationVariables
>;

/**
 * __useUpdateContestMutation__
 *
 * To run a mutation, you first call `useUpdateContestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContestMutation, { data, loading, error }] = useUpdateContestMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateContestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateContestMutation,
    UpdateContestMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateContestMutation,
    UpdateContestMutationVariables
  >(UpdateContestDocument, options);
}
export type UpdateContestMutationHookResult = ReturnType<
  typeof useUpdateContestMutation
>;
export type UpdateContestMutationResult =
  Apollo.MutationResult<UpdateContestMutation>;
export type UpdateContestMutationOptions = Apollo.BaseMutationOptions<
  UpdateContestMutation,
  UpdateContestMutationVariables
>;
export const FindByIdForExamDocument = gql`
  query FindByIdForExam($id: String!) {
    findOneContestById(id: $id) {
      id
      type
      tags {
        title
      }
      questions {
        id
        title
        options
        type
      }
      title
      level
      duration
      published
      countries
      created
      updated
      status
      authorId
      startTime
      participants
      easyQuestionCount
      mediumQuestionCount
      hardQuestionCount
      maxParticipants
    }
  }
`;

/**
 * __useFindByIdForExamQuery__
 *
 * To run a query within a React component, call `useFindByIdForExamQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindByIdForExamQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindByIdForExamQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindByIdForExamQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindByIdForExamQuery,
    FindByIdForExamQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindByIdForExamQuery, FindByIdForExamQueryVariables>(
    FindByIdForExamDocument,
    options
  );
}
export function useFindByIdForExamLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindByIdForExamQuery,
    FindByIdForExamQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindByIdForExamQuery,
    FindByIdForExamQueryVariables
  >(FindByIdForExamDocument, options);
}
export type FindByIdForExamQueryHookResult = ReturnType<
  typeof useFindByIdForExamQuery
>;
export type FindByIdForExamLazyQueryHookResult = ReturnType<
  typeof useFindByIdForExamLazyQuery
>;
export type FindByIdForExamQueryResult = Apollo.QueryResult<
  FindByIdForExamQuery,
  FindByIdForExamQueryVariables
>;
export const FindByIdForReviewDocument = gql`
  query FindByIdForReview($id: String!, $answerId: String) {
    findOneContestById(id: $id, answerId: $answerId) {
      id
      type
      tags {
        title
      }
      questions {
        id
        title
        options
        type
        tags {
          title
        }
        correctAnswer
        usedCount
        lesson
      }
      answers {
        id
        contestId
        userId
        answers {
          questionId
          option
          options
        }
        annulled
        annulledReason
        created
        updated
      }
      title
      level
      duration
      published
      countries
      created
      updated
      status
      authorId
      startTime
      participants
      easyQuestionCount
      mediumQuestionCount
      hardQuestionCount
      maxParticipants
    }
  }
`;

/**
 * __useFindByIdForReviewQuery__
 *
 * To run a query within a React component, call `useFindByIdForReviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindByIdForReviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindByIdForReviewQuery({
 *   variables: {
 *      id: // value for 'id'
 *      answerId: // value for 'answerId'
 *   },
 * });
 */
export function useFindByIdForReviewQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindByIdForReviewQuery,
    FindByIdForReviewQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindByIdForReviewQuery,
    FindByIdForReviewQueryVariables
  >(FindByIdForReviewDocument, options);
}
export function useFindByIdForReviewLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindByIdForReviewQuery,
    FindByIdForReviewQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindByIdForReviewQuery,
    FindByIdForReviewQueryVariables
  >(FindByIdForReviewDocument, options);
}
export type FindByIdForReviewQueryHookResult = ReturnType<
  typeof useFindByIdForReviewQuery
>;
export type FindByIdForReviewLazyQueryHookResult = ReturnType<
  typeof useFindByIdForReviewLazyQuery
>;
export type FindByIdForReviewQueryResult = Apollo.QueryResult<
  FindByIdForReviewQuery,
  FindByIdForReviewQueryVariables
>;
export const PaginateContestsDocument = gql`
  query PaginateContests($params: ContestPaginationDto!) {
    paginateContest(params: $params) {
      total
      data {
        id
        type
        tags {
          title
        }
        title
        level
        duration
        published
        countries
        created
        updated
        status
        authorId
        startTime
        participants
        easyQuestionCount
        mediumQuestionCount
        hardQuestionCount
        maxParticipants
      }
    }
  }
`;

/**
 * __usePaginateContestsQuery__
 *
 * To run a query within a React component, call `usePaginateContestsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaginateContestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaginateContestsQuery({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function usePaginateContestsQuery(
  baseOptions: Apollo.QueryHookOptions<
    PaginateContestsQuery,
    PaginateContestsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PaginateContestsQuery, PaginateContestsQueryVariables>(
    PaginateContestsDocument,
    options
  );
}
export function usePaginateContestsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PaginateContestsQuery,
    PaginateContestsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PaginateContestsQuery,
    PaginateContestsQueryVariables
  >(PaginateContestsDocument, options);
}
export type PaginateContestsQueryHookResult = ReturnType<
  typeof usePaginateContestsQuery
>;
export type PaginateContestsLazyQueryHookResult = ReturnType<
  typeof usePaginateContestsLazyQuery
>;
export type PaginateContestsQueryResult = Apollo.QueryResult<
  PaginateContestsQuery,
  PaginateContestsQueryVariables
>;
export const CreateQuestionDocument = gql`
  mutation CreateQuestion($input: CreateQuestionDto!) {
    createQuestion(input: $input) {
      id
      type
      title
      options
      authorId
      usedCount
      published
      created
      updated
    }
  }
`;
export type CreateQuestionMutationFn = Apollo.MutationFunction<
  CreateQuestionMutation,
  CreateQuestionMutationVariables
>;

/**
 * __useCreateQuestionMutation__
 *
 * To run a mutation, you first call `useCreateQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuestionMutation, { data, loading, error }] = useCreateQuestionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateQuestionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateQuestionMutation,
    CreateQuestionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateQuestionMutation,
    CreateQuestionMutationVariables
  >(CreateQuestionDocument, options);
}
export type CreateQuestionMutationHookResult = ReturnType<
  typeof useCreateQuestionMutation
>;
export type CreateQuestionMutationResult =
  Apollo.MutationResult<CreateQuestionMutation>;
export type CreateQuestionMutationOptions = Apollo.BaseMutationOptions<
  CreateQuestionMutation,
  CreateQuestionMutationVariables
>;
export const DeleteQuestionDocument = gql`
  mutation DeleteQuestion($id: String!) {
    deleteQuestionById(id: $id) {
      id
    }
  }
`;
export type DeleteQuestionMutationFn = Apollo.MutationFunction<
  DeleteQuestionMutation,
  DeleteQuestionMutationVariables
>;

/**
 * __useDeleteQuestionMutation__
 *
 * To run a mutation, you first call `useDeleteQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteQuestionMutation, { data, loading, error }] = useDeleteQuestionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteQuestionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteQuestionMutation,
    DeleteQuestionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteQuestionMutation,
    DeleteQuestionMutationVariables
  >(DeleteQuestionDocument, options);
}
export type DeleteQuestionMutationHookResult = ReturnType<
  typeof useDeleteQuestionMutation
>;
export type DeleteQuestionMutationResult =
  Apollo.MutationResult<DeleteQuestionMutation>;
export type DeleteQuestionMutationOptions = Apollo.BaseMutationOptions<
  DeleteQuestionMutation,
  DeleteQuestionMutationVariables
>;
export const UpdateQuestionDocument = gql`
  mutation UpdateQuestion($id: String!, $input: UpdateQuestionDto!) {
    updateQuestion(id: $id, input: $input) {
      id
      type
      title
      options
      authorId
      usedCount
      published
      created
      updated
    }
  }
`;
export type UpdateQuestionMutationFn = Apollo.MutationFunction<
  UpdateQuestionMutation,
  UpdateQuestionMutationVariables
>;

/**
 * __useUpdateQuestionMutation__
 *
 * To run a mutation, you first call `useUpdateQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateQuestionMutation, { data, loading, error }] = useUpdateQuestionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateQuestionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateQuestionMutation,
    UpdateQuestionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateQuestionMutation,
    UpdateQuestionMutationVariables
  >(UpdateQuestionDocument, options);
}
export type UpdateQuestionMutationHookResult = ReturnType<
  typeof useUpdateQuestionMutation
>;
export type UpdateQuestionMutationResult =
  Apollo.MutationResult<UpdateQuestionMutation>;
export type UpdateQuestionMutationOptions = Apollo.BaseMutationOptions<
  UpdateQuestionMutation,
  UpdateQuestionMutationVariables
>;
export const PaginateQuestionsDocument = gql`
  query PaginateQuestions($params: QuestionPaginationDto!) {
    paginateQuestions(params: $params) {
      total
      data {
        id
        title
        type
        options
        lesson
        correctAnswer
        tags {
          title
        }
        created
        updated
        authorId
        usedCount
      }
    }
  }
`;

/**
 * __usePaginateQuestionsQuery__
 *
 * To run a query within a React component, call `usePaginateQuestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaginateQuestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaginateQuestionsQuery({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function usePaginateQuestionsQuery(
  baseOptions: Apollo.QueryHookOptions<
    PaginateQuestionsQuery,
    PaginateQuestionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    PaginateQuestionsQuery,
    PaginateQuestionsQueryVariables
  >(PaginateQuestionsDocument, options);
}
export function usePaginateQuestionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PaginateQuestionsQuery,
    PaginateQuestionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PaginateQuestionsQuery,
    PaginateQuestionsQueryVariables
  >(PaginateQuestionsDocument, options);
}
export type PaginateQuestionsQueryHookResult = ReturnType<
  typeof usePaginateQuestionsQuery
>;
export type PaginateQuestionsLazyQueryHookResult = ReturnType<
  typeof usePaginateQuestionsLazyQuery
>;
export type PaginateQuestionsQueryResult = Apollo.QueryResult<
  PaginateQuestionsQuery,
  PaginateQuestionsQueryVariables
>;
export const FindTagsDocument = gql`
  query FindTags($title: String!) {
    findTags(title: $title) {
      title
    }
  }
`;

/**
 * __useFindTagsQuery__
 *
 * To run a query within a React component, call `useFindTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindTagsQuery({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useFindTagsQuery(
  baseOptions: Apollo.QueryHookOptions<FindTagsQuery, FindTagsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindTagsQuery, FindTagsQueryVariables>(
    FindTagsDocument,
    options
  );
}
export function useFindTagsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindTagsQuery,
    FindTagsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindTagsQuery, FindTagsQueryVariables>(
    FindTagsDocument,
    options
  );
}
export type FindTagsQueryHookResult = ReturnType<typeof useFindTagsQuery>;
export type FindTagsLazyQueryHookResult = ReturnType<
  typeof useFindTagsLazyQuery
>;
export type FindTagsQueryResult = Apollo.QueryResult<
  FindTagsQuery,
  FindTagsQueryVariables
>;
export const UpdateUserDocument = gql`
  mutation UpdateUser($id: String!, $input: UpdateUserDto!) {
    updateUser(id: $id, input: $input) {
      id
      email
    }
  }
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    options
  );
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>;
export type UpdateUserMutationResult =
  Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;
export const GetAuthUserDocument = gql`
  query GetAuthUser {
    getAuthUser {
      id
      key
      email
      firstName
      lastName
      isActive
      emailConfirmed
      role {
        title
      }
      image
    }
  }
`;

/**
 * __useGetAuthUserQuery__
 *
 * To run a query within a React component, call `useGetAuthUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAuthUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAuthUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAuthUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAuthUserQuery,
    GetAuthUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAuthUserQuery, GetAuthUserQueryVariables>(
    GetAuthUserDocument,
    options
  );
}
export function useGetAuthUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAuthUserQuery,
    GetAuthUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAuthUserQuery, GetAuthUserQueryVariables>(
    GetAuthUserDocument,
    options
  );
}
export type GetAuthUserQueryHookResult = ReturnType<typeof useGetAuthUserQuery>;
export type GetAuthUserLazyQueryHookResult = ReturnType<
  typeof useGetAuthUserLazyQuery
>;
export type GetAuthUserQueryResult = Apollo.QueryResult<
  GetAuthUserQuery,
  GetAuthUserQueryVariables
>;
