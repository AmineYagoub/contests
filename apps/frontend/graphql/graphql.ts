import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  /** Identifies contest entity related to this answer. */
  contest?: Maybe<Contest>;
  /** Identifies contest id related to this answer. */
  contestId: Scalars['String'];
  /** Identifies the date and time when the object was created. */
  created: Scalars['DateTime'];
  id: Scalars['ID'];
  /** Identifies the teacher id of the user hwo submit this answer. */
  teacherId?: Maybe<Scalars['String']>;
  /** Identifies the date and time when the object was last updated. */
  updated: Scalars['DateTime'];
  /** Identifies the user id hwo submit this answer. */
  userId: User;
};

export type AnswerInput = {
  id: Scalars['String'];
};

export type AnswerPaginationDto = {
  orderBy?: InputMaybe<OrderAnswerArgs>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<WhereAnswerArgs>;
};

export type AnswerPaginationResponse = {
  __typename?: 'AnswerPaginationResponse';
  data?: Maybe<Array<Answer>>;
  total: Scalars['Int'];
};

export type App = {
  __typename?: 'App';
  /** Identifies the user about us content. */
  aboutUs: Scalars['String'];
  /** Identifies the user agreement content. */
  agreement: Scalars['String'];
  /** Identifies the iphone app url in AppStore. */
  appStorUrl: Scalars['String'];
  /** Identifies the email used to receive messages from contactUs page. */
  contactEmail: Scalars['String'];
  /** Identifies the description of App. */
  description: Scalars['String'];
  /** Identifies facebook url. */
  facebookUrl: Scalars['String'];
  id: Scalars['ID'];
  /** Identifies instagram url. */
  instagramUrl: Scalars['String'];
  /** Identifies the android app url in google play. */
  playStorUrl: Scalars['String'];
  /** Identifies the privacy policy content. */
  privacy: Scalars['String'];
  /** Identifies the App title. */
  title: Scalars['String'];
  /** Identifies twitter url. */
  twitterUrl: Scalars['String'];
  /** Identifies telegram url. */
  youtubeUrl: Scalars['String'];
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

export type BatchPayloadResult = {
  __typename?: 'BatchPayloadResult';
  count: Scalars['Int'];
};

export type ContactUsDto = {
  content: Scalars['String'];
  email: Scalars['String'];
  title: Scalars['String'];
  to: Scalars['String'];
};

export type ContactUsResponse = {
  __typename?: 'ContactUsResponse';
  envelopeTime?: Maybe<Scalars['Int']>;
  messageId?: Maybe<Scalars['String']>;
  messageSize?: Maybe<Scalars['Int']>;
  messageTime?: Maybe<Scalars['Int']>;
};

export type Contest = {
  __typename?: 'Contest';
  /** Identifies a list of answers that belongs to this contest. */
  answers?: Maybe<Array<Answer>>;
  /** Identifies the author of the entity. */
  authorId: User;
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
  level?: Maybe<Array<StudentLevel>>;
  /** Identifies the max number of Participants in the Contest. */
  maxParticipants?: Maybe<Scalars['Int']>;
  /** Identifies how many medium questions in the Contest. */
  mediumQuestionCount: Scalars['Int'];
  /** Identifies a list of users ids that joins this contest. */
  participants?: Maybe<Array<Scalars['String']>>;
  /** Identifies if the entity is published or not. */
  published: Scalars['Boolean'];
  /** Identifies a list of questions ids that connected to this contest. */
  questions?: Maybe<Array<Question>>;
  /** Identifies the date and time when contest started. */
  startTime: Scalars['DateTime'];
  /** Identifies the status of the Contest. */
  status: ContestStatus;
  /** Identifies the title of the Contest. */
  title: Scalars['String'];
  /** Identifies a list of topics that belongs to this contest. */
  topics?: Maybe<Array<Topic>>;
  /** Identifies the Type of this Contest. */
  type: ContestType;
  /** Identifies the date and time when the object was last updated. */
  updated: Scalars['DateTime'];
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
  Open = 'OPEN'
}

/** Contest Type */
export enum ContestType {
  Centralized = 'CENTRALIZED',
  Regional = 'REGIONAL',
  Worldwide = 'WORLDWIDE'
}

export type CreateAnswerDto = {
  annulled?: InputMaybe<Scalars['Boolean']>;
  annulledReason?: InputMaybe<Scalars['String']>;
  answers: Array<SelectedAnswerInput>;
  contest: ContestConnectInput;
  teacherId?: InputMaybe<Scalars['String']>;
  teacherProfileId?: InputMaybe<Scalars['String']>;
  userId: Scalars['String'];
};

export type CreateContestDto = {
  authorId: Scalars['String'];
  countries?: InputMaybe<Array<Scalars['String']>>;
  duration?: InputMaybe<Scalars['Int']>;
  easyQuestionCount: Scalars['Int'];
  hardQuestionCount: Scalars['Int'];
  level?: InputMaybe<Array<StudentLevel>>;
  maxParticipants?: InputMaybe<Scalars['Int']>;
  mediumQuestionCount: Scalars['Int'];
  participants?: InputMaybe<Array<Scalars['String']>>;
  published?: InputMaybe<Scalars['Boolean']>;
  startTime: Scalars['DateTime'];
  status: ContestStatus;
  title: Scalars['String'];
  topics: TopicConnectId;
  type: ContestType;
};

export type CreateMessageDto = {
  authorId: Scalars['String'];
  content: Scalars['String'];
  recipientId?: InputMaybe<Scalars['String']>;
  type: MessageType;
};

export type CreateQuestionDto = {
  authorId: Scalars['String'];
  correctAnswer: Scalars['String'];
  lesson: Scalars['String'];
  options: Array<Scalars['String']>;
  published?: InputMaybe<Scalars['Boolean']>;
  title: Scalars['String'];
  topics: TopicConnectTitle;
  type: QuestionType;
};

export type CreateSubscriptionPlansDto = {
  allowedContests?: InputMaybe<Scalars['Int']>;
  options: Array<Scalars['String']>;
  period?: InputMaybe<Scalars['Int']>;
  price: Scalars['Int'];
  subTitle: Scalars['String'];
  title: Scalars['String'];
};

export type DashboardLevelResponse = {
  __typename?: 'DashboardLevelResponse';
  level: Scalars['String'];
  value: Scalars['Int'];
};

export type DashboardResponse = {
  __typename?: 'DashboardResponse';
  levels: Array<DashboardLevelResponse>;
  studentTeacher: Scalars['Int'];
  students: Scalars['Int'];
  teachers: Scalars['Int'];
};

export type EmailDto = {
  email: Scalars['String'];
};

export type IdDto = {
  id: Scalars['String'];
};

export type Membership = {
  __typename?: 'Membership';
  /** Identifies the date and time when the object was created. */
  created: Scalars['DateTime'];
  /** Identifies the end date of the membership. */
  endDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  /** Identifies the subscription plan. */
  memberShipOn: Array<SubscriptionPlan>;
  /** Identifies the number of renew times. */
  renewCount: Scalars['Int'];
  /** Identifies the start date of the membership. */
  startDate?: Maybe<Scalars['DateTime']>;
  /** Identifies the status of the membership. */
  status: MembershipStatus;
  /** Identifies the date and time when the object was last updated. */
  updated: Scalars['DateTime'];
};

/** Membership Status */
export enum MembershipStatus {
  Active = 'ACTIVE',
  Canceled = 'CANCELED',
  Expired = 'EXPIRED',
  Unpaid = 'UNPAID'
}

export type Message = {
  __typename?: 'Message';
  /** Identifies the author of the entity. */
  authorId: User;
  /** Identifies the content of the message. */
  content: Scalars['String'];
  /** Identifies the date and time when the object was created. */
  created: Scalars['DateTime'];
  id: Scalars['ID'];
  /** Identifies if the entity is published or not. */
  published: Scalars['Boolean'];
  /** Identifies the recipient id. */
  recipientId?: Maybe<User>;
  /** Identifies the recipients ids in case the message sent to multiple users. */
  recipients: Array<Scalars['String']>;
  /** Identifies the type of the Message */
  type: MessageType;
  /** Identifies the date and time when the object was last updated. */
  updated: Scalars['DateTime'];
  /** Identifies if this message viewed by recipient. */
  viewed?: Maybe<Scalars['Boolean']>;
};

export type MessagePaginationDto = {
  orderBy?: InputMaybe<OrderMessageArgs>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<WhereMessageArgs>;
};

export type MessagePaginationResponse = {
  __typename?: 'MessagePaginationResponse';
  data?: Maybe<Array<Message>>;
  total: Scalars['Int'];
};

/** Message type */
export enum MessageType {
  Alert = 'ALERT',
  Announce = 'ANNOUNCE',
  Info = 'INFO',
  Message = 'MESSAGE',
  Report = 'REPORT',
  Request = 'REQUEST'
}

export type Mutation = {
  __typename?: 'Mutation';
  activateEmailToken: User;
  connectStudentToTeacher: Teacher;
  createAnswer: Answer;
  createContest: Contest;
  createMessage: Message;
  createQuestion: Question;
  createSubscriptionPlan: SubscriptionPlan;
  deleteAnswerById?: Maybe<Answer>;
  deleteContestById?: Maybe<Contest>;
  deleteMessage: Message;
  deleteQuestionById?: Maybe<Question>;
  deleteSubscriptionPlanById?: Maybe<SubscriptionPlan>;
  deleteTopicById?: Maybe<Topic>;
  deleteUserById?: Maybe<User>;
  emailTokenToRecoverPassword: Scalars['Boolean'];
  resendEmailActivationCode: Scalars['Boolean'];
  seedCtsData?: Maybe<Scalars['Boolean']>;
  seedData?: Maybe<Scalars['Boolean']>;
  sendContactUsForm: ContactUsResponse;
  sendNotifications?: Maybe<Message>;
  signing: Auth;
  signup: Scalars['Boolean'];
  updateAnswer: Answer;
  updateAppConfig: App;
  updateContest: Contest;
  updateMessageViewStat: BatchPayloadResult;
  updateMessagesCount: User;
  updateQuestion: Question;
  updateStudentDocuments: User;
  updateStudentProfile: User;
  updateSubscriptionPlan: SubscriptionPlan;
  updateTeacherProfile: User;
  updateTeacherSubscription: Teacher;
  updateTopic: Topic;
  updateUser: User;
};


export type MutationActivateEmailTokenArgs = {
  input: IdDto;
};


export type MutationConnectStudentToTeacherArgs = {
  connect: Scalars['Boolean'];
  id: Scalars['String'];
  studentId: Scalars['String'];
};


export type MutationCreateAnswerArgs = {
  data: CreateAnswerDto;
};


export type MutationCreateContestArgs = {
  input: CreateContestDto;
};


export type MutationCreateMessageArgs = {
  input: CreateMessageDto;
};


export type MutationCreateQuestionArgs = {
  input: CreateQuestionDto;
};


export type MutationCreateSubscriptionPlanArgs = {
  input: CreateSubscriptionPlansDto;
};


export type MutationDeleteAnswerByIdArgs = {
  id: Scalars['String'];
};


export type MutationDeleteContestByIdArgs = {
  id: Scalars['String'];
};


export type MutationDeleteMessageArgs = {
  id: Scalars['String'];
};


export type MutationDeleteQuestionByIdArgs = {
  id: Scalars['String'];
};


export type MutationDeleteSubscriptionPlanByIdArgs = {
  id: Scalars['String'];
};


export type MutationDeleteTopicByIdArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUserByIdArgs = {
  id: Scalars['String'];
};


export type MutationEmailTokenToRecoverPasswordArgs = {
  input: EmailDto;
};


export type MutationResendEmailActivationCodeArgs = {
  input: EmailDto;
};


export type MutationSendContactUsFormArgs = {
  input: ContactUsDto;
};


export type MutationSendNotificationsArgs = {
  input: SendMessageDto;
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


export type MutationUpdateAppConfigArgs = {
  input: UpdateAppConfigDto;
};


export type MutationUpdateContestArgs = {
  id: Scalars['String'];
  input: UpdateContestDto;
};


export type MutationUpdateMessageViewStatArgs = {
  input: UpdateMessageDto;
};


export type MutationUpdateMessagesCountArgs = {
  count: Scalars['Int'];
  id: Scalars['String'];
  isMessage: Scalars['Boolean'];
};


export type MutationUpdateQuestionArgs = {
  id: Scalars['String'];
  input: UpdateQuestionDto;
};


export type MutationUpdateStudentDocumentsArgs = {
  id: Scalars['String'];
  input: UpdateDocumentsDto;
};


export type MutationUpdateStudentProfileArgs = {
  id: Scalars['String'];
  input: UpdateStudentDto;
};


export type MutationUpdateSubscriptionPlanArgs = {
  id: Scalars['String'];
  input: UpdateSubscriptionPlansDto;
};


export type MutationUpdateTeacherProfileArgs = {
  id: Scalars['String'];
  input: UpdateTeacherDto;
};


export type MutationUpdateTeacherSubscriptionArgs = {
  id: Scalars['String'];
  input: UpdateTeacherSubscriptionDto;
};


export type MutationUpdateTopicArgs = {
  id: Scalars['String'];
  title: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  id: Scalars['String'];
  input: UpdateUserDto;
};

export type OrderAnswerArgs = {
  created?: InputMaybe<OrderByType>;
};

/** OrderBy Type */
export enum OrderByType {
  Asc = 'Asc',
  Desc = 'Desc'
}

export type OrderContestArgs = {
  created?: InputMaybe<OrderByType>;
  duration?: InputMaybe<OrderByType>;
  participants?: InputMaybe<OrderByType>;
  startTime?: InputMaybe<OrderByType>;
};

export type OrderMessageArgs = {
  created?: InputMaybe<OrderByType>;
};

export type OrderQuestionArgs = {
  created?: InputMaybe<OrderByType>;
  options?: InputMaybe<OrderByType>;
  usedCount?: InputMaybe<OrderByType>;
};

export type OrderUserArgs = {
  created?: InputMaybe<OrderByType>;
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
  AccessStudentDashboard = 'ACCESS_STUDENT_DASHBOARD',
  AccessTeacherDashboard = 'ACCESS_TEACHER_DASHBOARD',
  CreateContest = 'CREATE_CONTEST',
  ViewAnalytics = 'VIEW_ANALYTICS',
  ViewContestResult = 'VIEW_CONTEST_RESULT',
  ViewMessages = 'VIEW_MESSAGES',
  ViewRolesPermissions = 'VIEW_ROLES_PERMISSIONS',
  ViewSettings = 'VIEW_SETTINGS',
  ViewUsers = 'VIEW_USERS'
}

export type Profile = Student | Teacher;

export type Query = {
  __typename?: 'Query';
  countAllNotificationsForAdmin: Scalars['Int'];
  dashboard: DashboardResponse;
  findAdminAndTeacher: Array<User>;
  findAllSubscriptionPlans: Array<SubscriptionPlan>;
  findAllTopics?: Maybe<Array<Topic>>;
  findAppConfig: App;
  findEmailToken: ActivationToken;
  findLastMessages: Array<Message>;
  findLastNotifications: Array<Message>;
  findMembershipByProfileId?: Maybe<Membership>;
  findOneAnswerById?: Maybe<Answer>;
  findOneContestById?: Maybe<Contest>;
  findOneQuestionById?: Maybe<Question>;
  findOneTopicById?: Maybe<Topic>;
  findStudents: Array<User>;
  findSubscriptionPlan: SubscriptionPlan;
  findTeacher: Array<User>;
  findTopics?: Maybe<Array<Topic>>;
  findUser: User;
  getAuthUser: User;
  paginateAnswers: AnswerPaginationResponse;
  paginateContest?: Maybe<ContestPaginationResponse>;
  paginateMessages?: Maybe<MessagePaginationResponse>;
  paginateNotifications?: Maybe<MessagePaginationResponse>;
  paginateQuestions?: Maybe<QuestionPaginationResponse>;
  paginateUsers?: Maybe<UserPaginationResponse>;
  searchUsers?: Maybe<Array<Profile>>;
  teacherDashboard?: Maybe<TeacherDashboardResponse>;
};


export type QueryFindAdminAndTeacherArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryFindAllTopicsArgs = {
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryFindEmailTokenArgs = {
  token: Scalars['String'];
};


export type QueryFindLastMessagesArgs = {
  id: Scalars['String'];
};


export type QueryFindLastNotificationsArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryFindMembershipByProfileIdArgs = {
  id: Scalars['String'];
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


export type QueryFindOneTopicByIdArgs = {
  id: Scalars['String'];
};


export type QueryFindStudentsArgs = {
  name?: InputMaybe<Scalars['String']>;
  teacherId?: InputMaybe<Scalars['String']>;
};


export type QueryFindSubscriptionPlanArgs = {
  id: Scalars['String'];
};


export type QueryFindTeacherArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type QueryFindTopicsArgs = {
  level?: InputMaybe<Array<StudentLevel>>;
  title?: InputMaybe<Scalars['String']>;
};


export type QueryFindUserArgs = {
  key: Scalars['Int'];
};


export type QueryPaginateAnswersArgs = {
  params: AnswerPaginationDto;
};


export type QueryPaginateContestArgs = {
  params: ContestPaginationDto;
};


export type QueryPaginateMessagesArgs = {
  params: MessagePaginationDto;
};


export type QueryPaginateNotificationsArgs = {
  params: MessagePaginationDto;
};


export type QueryPaginateQuestionsArgs = {
  params: QuestionPaginationDto;
};


export type QueryPaginateUsersArgs = {
  params: UserPaginationDto;
};


export type QuerySearchUsersArgs = {
  params: UserPaginationDto;
};


export type QueryTeacherDashboardArgs = {
  id: Scalars['String'];
};

export type Question = {
  __typename?: 'Question';
  /** Identifies the author of the entity. */
  authorId: User;
  /** Identifies the correct answer for this Question. */
  correctAnswer?: Maybe<Scalars['String']>;
  /** Identifies the date and time when the object was created. */
  created: Scalars['DateTime'];
  id: Scalars['ID'];
  /** Identifies the lesson learned from this Question. */
  lesson: Scalars['String'];
  /** Identifies a list of answers of this Question. */
  options: Array<Scalars['String']>;
  /** Identifies if the entity is published or not. */
  published: Scalars['Boolean'];
  /** Identifies the title of the Question. */
  title: Scalars['String'];
  /** Identifies a list of topics that belongs to this Question. */
  topics?: Maybe<Array<Topic>>;
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
  Medium = 'MEDIUM'
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
  Teacher = 'TEACHER'
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

export type SendMessageDto = {
  authorId: Scalars['String'];
  content: Scalars['String'];
  recipients: Array<Scalars['String']>;
  type: MessageType;
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

export type Student = {
  __typename?: 'Student';
  /** Identifies A copy of the birth certificate of the student. */
  birthCertImage?: Maybe<Scalars['String']>;
  /** Identifies the country of the user. */
  country?: Maybe<Scalars['String']>;
  /** Identifies the date and time when the object was created. */
  created: Scalars['DateTime'];
  /** Identifies the date and time when the object was created. */
  dateOfBirth?: Maybe<Scalars['DateTime']>;
  /** Identifies the first name of the user. */
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Identifies the first name of the user. */
  key?: Maybe<Scalars['Int']>;
  /** Identifies the last name of the user. */
  lastName?: Maybe<Scalars['String']>;
  /** Identifies An official letter approved by the school in which he is studying. */
  letterImage?: Maybe<Scalars['String']>;
  /** Identifies student level. */
  level: StudentLevel;
  /** Identifies the avatar of the user. */
  personalImage?: Maybe<Scalars['String']>;
  /** Identifies the supervisor teacher associated with that student. */
  teacher?: Maybe<Teacher>;
  /** Identifies the date and time when the object was last updated. */
  updated: Scalars['DateTime'];
  /** Identifies the user is of the profile. */
  userId?: Maybe<Scalars['String']>;
};

/** Student Level */
export enum StudentLevel {
  Eighteen = 'Eighteen',
  Fifteen = 'Fifteen',
  Fourteen = 'Fourteen',
  Nineteen = 'Nineteen',
  Seventeen = 'Seventeen',
  Sixteen = 'Sixteen',
  Student = 'Student',
  Thirteen = 'Thirteen'
}

export type SubscriptionPlan = {
  __typename?: 'SubscriptionPlan';
  /** Identifies the number of allowed contests that can be created in this plan. */
  allowedContests: Scalars['Int'];
  /** Identifies the date and time when the object was created. */
  created: Scalars['DateTime'];
  id: Scalars['ID'];
  /** Identifies the number of allowed contests that can be created in this plan. */
  memberships: Array<Membership>;
  /** Identifies a list of plan options */
  options: Array<Scalars['String']>;
  /** Identifies the number of allowed contests that can be created in this plan. */
  period: Scalars['Int'];
  /** Identifies the unique price of the plan. */
  price: Scalars['Int'];
  /** Identifies the unique sub title of the plan. */
  subTitle: Scalars['String'];
  /** Identifies the unique title of the plan. */
  title: Scalars['String'];
  /** Identifies the date and time when the object was last updated. */
  updated: Scalars['DateTime'];
};

export type Teacher = {
  __typename?: 'Teacher';
  /** Identifies the country of the user. */
  country?: Maybe<Scalars['String']>;
  /** Identifies the date and time when the object was created. */
  created: Scalars['DateTime'];
  /** Identifies the date and time when the object was created. */
  dateOfBirth?: Maybe<Scalars['DateTime']>;
  /** Identifies the first name of the user. */
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Identifies the first name of the user. */
  key?: Maybe<Scalars['Int']>;
  /** Identifies the last name of the user. */
  lastName?: Maybe<Scalars['String']>;
  /** Identifies the avatar of the user. */
  personalImage?: Maybe<Scalars['String']>;
  /** Identifies the phone of the user. */
  phone?: Maybe<UserPhone>;
  /** Identifies a List of students affiliated with this teacher. */
  students?: Maybe<Array<Student>>;
  /** Identifies the subscription plan of the user. */
  subscription?: Maybe<Membership>;
  /** Identifies the date and time when the object was last updated. */
  updated: Scalars['DateTime'];
  /** Identifies the user is of the profile. */
  userId?: Maybe<Scalars['String']>;
};

export type TeacherDashboardResponse = {
  __typename?: 'TeacherDashboardResponse';
  meTotal: Scalars['Int'];
  total: Scalars['Int'];
};

export type Topic = {
  __typename?: 'Topic';
  /** Identifies the date and time when the object was created. */
  created: Scalars['DateTime'];
  id: Scalars['ID'];
  /** Identifies the level of the Topic. */
  level: Array<StudentLevel>;
  /** Identifies the title of the Topic. */
  title: Scalars['String'];
  /** Identifies the date and time when the object was last updated. */
  updated: Scalars['DateTime'];
};

export type TopicConnectId = {
  connect: Array<TopicInputId>;
};

export type TopicConnectTitle = {
  connect: Array<TopicInputTitle>;
};

export type TopicInputId = {
  id: Scalars['String'];
};

export type TopicInputTitle = {
  title: Scalars['String'];
};

export type UpdateAnswerDto = {
  annulled?: InputMaybe<Scalars['Boolean']>;
  annulledReason?: InputMaybe<Scalars['String']>;
  answers?: InputMaybe<Array<SelectedAnswerInput>>;
  contest?: InputMaybe<ContestConnectInput>;
  teacherId?: InputMaybe<Scalars['String']>;
  teacherProfileId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type UpdateAppConfigDto = {
  /** Identifies the user about us content. */
  aboutUs?: InputMaybe<Scalars['String']>;
  /** Identifies the user agreement content. */
  agreement?: InputMaybe<Scalars['String']>;
  /** Identifies the iphone app url in AppStore. */
  appStorUrl?: InputMaybe<Scalars['String']>;
  /** Identifies the email used to receive messages from contactUs page. */
  contactEmail?: InputMaybe<Scalars['String']>;
  /** Identifies the description of App. */
  description?: InputMaybe<Scalars['String']>;
  /** Identifies facebook url. */
  facebookUrl?: InputMaybe<Scalars['String']>;
  /** Identifies instagram url. */
  instagramUrl?: InputMaybe<Scalars['String']>;
  /** Identifies the android app url in google play. */
  playStorUrl?: InputMaybe<Scalars['String']>;
  /** Identifies the user privacy policy content. */
  privacy?: InputMaybe<Scalars['String']>;
  /** Identifies the App title. */
  title?: InputMaybe<Scalars['String']>;
  /** Identifies twitter url. */
  twitterUrl?: InputMaybe<Scalars['String']>;
  /** Identifies youtube channel url. */
  youtubeUrl?: InputMaybe<Scalars['String']>;
};

export type UpdateContestDto = {
  authorId?: InputMaybe<Scalars['String']>;
  countries?: InputMaybe<Array<Scalars['String']>>;
  duration?: InputMaybe<Scalars['Int']>;
  easyQuestionCount?: InputMaybe<Scalars['Int']>;
  hardQuestionCount?: InputMaybe<Scalars['Int']>;
  level?: InputMaybe<Array<StudentLevel>>;
  maxParticipants?: InputMaybe<Scalars['Int']>;
  mediumQuestionCount?: InputMaybe<Scalars['Int']>;
  participants?: InputMaybe<Array<Scalars['String']>>;
  published?: InputMaybe<Scalars['Boolean']>;
  startTime?: InputMaybe<Scalars['DateTime']>;
  status?: InputMaybe<ContestStatus>;
  title?: InputMaybe<Scalars['String']>;
  topics?: InputMaybe<TopicConnectId>;
  type?: InputMaybe<ContestType>;
};

export type UpdateDocumentsDto = {
  birthCertImage?: InputMaybe<Scalars['String']>;
  letterImage?: InputMaybe<Scalars['String']>;
  personalImage?: InputMaybe<Scalars['String']>;
};

export type UpdateMessageDto = {
  /** Identify all my message ids that i have viewed */
  meIds: Array<Scalars['String']>;
  viewed: Scalars['Boolean'];
};

export type UpdateQuestionDto = {
  authorId?: InputMaybe<Scalars['String']>;
  correctAnswer?: InputMaybe<Scalars['String']>;
  lesson?: InputMaybe<Scalars['String']>;
  options?: InputMaybe<Array<Scalars['String']>>;
  published?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
  topics?: InputMaybe<TopicConnectTitle>;
  type?: InputMaybe<QuestionType>;
  usedCount?: InputMaybe<Scalars['Int']>;
};

export type UpdateStudentDto = {
  country: Scalars['String'];
  dateOfBirth: Scalars['DateTime'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  level: StudentLevel;
  role: RoleTitle;
  /** if student already connected with one teacher we should get teacher ID otherwise the validation fail */
  teacherId?: InputMaybe<Scalars['String']>;
};

export type UpdateSubscriptionPlansDto = {
  allowedContests?: InputMaybe<Scalars['Int']>;
  options?: InputMaybe<Array<Scalars['String']>>;
  period?: InputMaybe<Scalars['Int']>;
  price?: InputMaybe<Scalars['Int']>;
  subTitle?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateTeacherDto = {
  country: Scalars['String'];
  dateOfBirth: Scalars['DateTime'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
  phoneCode: Scalars['String'];
};

export type UpdateTeacherSubscriptionDto = {
  disconnect?: InputMaybe<Scalars['Boolean']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  membershipStatus: MembershipStatus;
  planId: Scalars['String'];
  renewCount?: InputMaybe<Scalars['Int']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
};

export type UpdateUserDto = {
  agreement?: InputMaybe<Scalars['Boolean']>;
  confirmPassword?: InputMaybe<Scalars['String']>;
  currentPassword?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  password?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleTitle>;
  teacherId?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  /** Identifies if the user are accepted agreement. */
  agreement: Scalars['Boolean'];
  countAllMessages?: Maybe<Scalars['Int']>;
  countAllNotifications?: Maybe<Scalars['Int']>;
  /** Identifies the date and time when the object was created. */
  created: Scalars['DateTime'];
  /** Identifies the unique email of the user. */
  email: Scalars['String'];
  /** Identifies if the user email is confirmed. */
  emailConfirmed: Scalars['Boolean'];
  id: Scalars['ID'];
  /** Identifies if the user is active or banned. */
  isActive: Scalars['Boolean'];
  /** Identifies the unique key the user. */
  key: Scalars['Int'];
  /** Identifies the number of messages viewed by user. */
  messagesCount: Scalars['Int'];
  /** Identifies the number of notifications viewed by user. */
  notificationsCount: Scalars['Int'];
  /** Identifies the Profile of the user. */
  profile?: Maybe<Profile>;
  /** Identifies the role of the user. */
  role?: Maybe<Role>;
  /** Identifies the date and time when the object was last updated. */
  updated: Scalars['DateTime'];
};

export type UserPaginationDto = {
  orderBy?: InputMaybe<OrderUserArgs>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<WhereUserArgs>;
};

export type UserPaginationResponse = {
  __typename?: 'UserPaginationResponse';
  data?: Maybe<Array<User>>;
  total: Scalars['Int'];
};

export type UserPhone = {
  __typename?: 'UserPhone';
  /** user phone */
  phone: Scalars['String'];
  /** phone international code */
  phoneCode: Scalars['String'];
};

export type WhereAnswerArgs = {
  annulled?: InputMaybe<Scalars['Boolean']>;
  annulledReason?: InputMaybe<Scalars['String']>;
  answers?: InputMaybe<Array<SelectedAnswerInput>>;
  contest?: InputMaybe<ContestConnectInput>;
  teacherId?: InputMaybe<Scalars['String']>;
  teacherProfileId?: InputMaybe<Scalars['String']>;
};

export type WhereContestArgs = {
  answerBy?: InputMaybe<Scalars['String']>;
  authorId?: InputMaybe<Scalars['String']>;
  countries?: InputMaybe<Array<Scalars['String']>>;
  created?: InputMaybe<Array<Scalars['String']>>;
  level?: InputMaybe<Array<StudentLevel>>;
  noAnswerBy?: InputMaybe<Scalars['String']>;
  participants?: InputMaybe<Array<Scalars['String']>>;
  startTime?: InputMaybe<Array<Scalars['String']>>;
  status?: InputMaybe<ContestStatus>;
  tags?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<ContestType>;
};

export type WhereMessageArgs = {
  authorId?: InputMaybe<Scalars['String']>;
  recipientId?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<MessageType>;
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

export type WhereUserArgs = {
  country?: InputMaybe<Scalars['String']>;
  emailConfirmed?: InputMaybe<Scalars['Boolean']>;
  firstName?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  lastName?: InputMaybe<Scalars['String']>;
  level?: InputMaybe<StudentLevel>;
  role: Array<RoleTitle>;
  /** if student already connected with one teacher we should get teacher ID otherwise the validation fail */
  teacherId?: InputMaybe<Scalars['String']>;
};

export type CreateAnswerMutationVariables = Exact<{
  data: CreateAnswerDto;
}>;


export type CreateAnswerMutation = { __typename?: 'Mutation', createAnswer: { __typename?: 'Answer', id: string, created: any, updated: any } };

export type UpdateAnswerMutationVariables = Exact<{
  id: Scalars['String'];
  data: UpdateAnswerDto;
}>;


export type UpdateAnswerMutation = { __typename?: 'Mutation', updateAnswer: { __typename?: 'Answer', id: string, created: any, updated: any } };

export type FindOneAnswerByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type FindOneAnswerByIdQuery = { __typename?: 'Query', findOneAnswerById?: { __typename?: 'Answer', annulled: boolean, annulledReason: string, created: any, updated: any, userId: { __typename?: 'User', id: string }, answers: Array<{ __typename?: 'SelectedAnswerObject', questionId: string, questionIndex: number, optionIndex: number }> } | null };

export type PaginateAnswersQueryVariables = Exact<{
  params: AnswerPaginationDto;
}>;


export type PaginateAnswersQuery = { __typename?: 'Query', paginateAnswers: { __typename?: 'AnswerPaginationResponse', total: number, data?: Array<{ __typename?: 'Answer', id: string, created: any, userId: { __typename?: 'User', role?: { __typename?: 'Role', title: RoleTitle } | null, profile?: { __typename: 'Student', id: string, firstName?: string | null, lastName?: string | null } | { __typename: 'Teacher', id: string } | null }, contest?: { __typename?: 'Contest', id: string, title: string, authorId: { __typename?: 'User', id: string, role?: { __typename?: 'Role', title: RoleTitle } | null, profile?: { __typename: 'Student', id: string } | { __typename: 'Teacher', id: string, firstName?: string | null, lastName?: string | null } | null } } | null }> | null } };

export type SendContactUsFormMutationVariables = Exact<{
  input: ContactUsDto;
}>;


export type SendContactUsFormMutation = { __typename?: 'Mutation', sendContactUsForm: { __typename?: 'ContactUsResponse', envelopeTime?: number | null, messageId?: string | null } };

export type UpdateAppConfigMutationVariables = Exact<{
  input: UpdateAppConfigDto;
}>;


export type UpdateAppConfigMutation = { __typename?: 'Mutation', updateAppConfig: { __typename?: 'App', id: string } };

export type DashboardQueryVariables = Exact<{ [key: string]: never; }>;


export type DashboardQuery = { __typename?: 'Query', dashboard: { __typename?: 'DashboardResponse', teachers: number, students: number, studentTeacher: number, levels: Array<{ __typename?: 'DashboardLevelResponse', level: string, value: number }> } };

export type FindAppConfigQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAppConfigQuery = { __typename?: 'Query', findAppConfig: { __typename?: 'App', title: string, description: string, contactEmail: string, appStorUrl: string, playStorUrl: string, youtubeUrl: string, twitterUrl: string, facebookUrl: string, instagramUrl: string } };

export type FindAboutUsPageQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAboutUsPageQuery = { __typename?: 'Query', findAppConfig: { __typename?: 'App', aboutUs: string, title: string, description: string, appStorUrl: string, playStorUrl: string, youtubeUrl: string, twitterUrl: string, facebookUrl: string, instagramUrl: string } };

export type FindPrivacyPolicyPageQueryVariables = Exact<{ [key: string]: never; }>;


export type FindPrivacyPolicyPageQuery = { __typename?: 'Query', findAppConfig: { __typename?: 'App', privacy: string, title: string, description: string, appStorUrl: string, playStorUrl: string, youtubeUrl: string, twitterUrl: string, facebookUrl: string, instagramUrl: string } };

export type FindTermsPageQueryVariables = Exact<{ [key: string]: never; }>;


export type FindTermsPageQuery = { __typename?: 'Query', findAppConfig: { __typename?: 'App', agreement: string, title: string, description: string, appStorUrl: string, playStorUrl: string, youtubeUrl: string, twitterUrl: string, facebookUrl: string, instagramUrl: string } };

export type ActivateEmailTokenMutationVariables = Exact<{
  input: IdDto;
}>;


export type ActivateEmailTokenMutation = { __typename?: 'Mutation', activateEmailToken: { __typename?: 'User', id: string } };

export type ResendEmailActivationCodeMutationVariables = Exact<{
  input: EmailDto;
}>;


export type ResendEmailActivationCodeMutation = { __typename?: 'Mutation', resendEmailActivationCode: boolean };

export type EmailTokenToRecoverPasswordMutationVariables = Exact<{
  input: EmailDto;
}>;


export type EmailTokenToRecoverPasswordMutation = { __typename?: 'Mutation', emailTokenToRecoverPassword: boolean };

export type SigningMutationVariables = Exact<{
  input: SigningDto;
}>;


export type SigningMutation = { __typename?: 'Mutation', signing: { __typename?: 'Auth', accessToken: string, refreshToken: string, tokenType: string } };

export type SignUpMutationVariables = Exact<{
  input: SignUpDto;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signup: boolean };

export type FindEmailTokenQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type FindEmailTokenQuery = { __typename?: 'Query', findEmailToken: { __typename?: 'ActivationToken', id: string, created: any, updated: any, user: { __typename?: 'User', id: string, email: string } } };

export type CreateContestMutationVariables = Exact<{
  input: CreateContestDto;
}>;


export type CreateContestMutation = { __typename?: 'Mutation', createContest: { __typename?: 'Contest', id: string, title: string, level?: Array<StudentLevel> | null, status: ContestStatus, startTime: any, published: boolean, created: any, updated: any } };

export type DeleteContestMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteContestMutation = { __typename?: 'Mutation', deleteContestById?: { __typename?: 'Contest', id: string } | null };

export type UpdateContestMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateContestDto;
}>;


export type UpdateContestMutation = { __typename?: 'Mutation', updateContest: { __typename?: 'Contest', id: string, title: string, duration: number, published: boolean, level?: Array<StudentLevel> | null, created: any, updated: any, status: ContestStatus, startTime: any, easyQuestionCount: number, mediumQuestionCount: number, hardQuestionCount: number, participants?: Array<string> | null } };

export type FindByIdForExamQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type FindByIdForExamQuery = { __typename?: 'Query', findOneContestById?: { __typename?: 'Contest', id: string, type: ContestType, title: string, level?: Array<StudentLevel> | null, duration: number, published: boolean, countries?: Array<string> | null, created: any, updated: any, status: ContestStatus, startTime: any, participants?: Array<string> | null, easyQuestionCount: number, mediumQuestionCount: number, hardQuestionCount: number, maxParticipants?: number | null, topics?: Array<{ __typename?: 'Topic', title: string }> | null, questions?: Array<{ __typename?: 'Question', id: string, title: string, options: Array<string>, type: QuestionType }> | null, answers?: Array<{ __typename?: 'Answer', userId: { __typename?: 'User', id: string } }> | null } | null };

export type FindByIdForReviewQueryVariables = Exact<{
  id: Scalars['String'];
  answerId?: InputMaybe<Scalars['String']>;
}>;


export type FindByIdForReviewQuery = { __typename?: 'Query', findOneContestById?: { __typename?: 'Contest', id: string, type: ContestType, title: string, level?: Array<StudentLevel> | null, duration: number, published: boolean, countries?: Array<string> | null, created: any, updated: any, status: ContestStatus, startTime: any, participants?: Array<string> | null, easyQuestionCount: number, mediumQuestionCount: number, hardQuestionCount: number, maxParticipants?: number | null, topics?: Array<{ __typename?: 'Topic', title: string }> | null, questions?: Array<{ __typename?: 'Question', id: string, title: string, options: Array<string>, type: QuestionType, correctAnswer?: string | null, usedCount?: number | null, lesson: string, topics?: Array<{ __typename?: 'Topic', title: string }> | null }> | null, answers?: Array<{ __typename?: 'Answer', id: string, contestId: string, annulled: boolean, annulledReason: string, created: any, updated: any, userId: { __typename?: 'User', id: string }, answers: Array<{ __typename?: 'SelectedAnswerObject', questionId: string, option: string, options: Array<string> }> }> | null } | null };

export type PaginateContestsQueryVariables = Exact<{
  params: ContestPaginationDto;
}>;


export type PaginateContestsQuery = { __typename?: 'Query', paginateContest?: { __typename?: 'ContestPaginationResponse', total: number, data?: Array<{ __typename?: 'Contest', id: string, type: ContestType, title: string, level?: Array<StudentLevel> | null, duration: number, published: boolean, countries?: Array<string> | null, created: any, updated: any, status: ContestStatus, startTime: any, participants?: Array<string> | null, easyQuestionCount: number, mediumQuestionCount: number, hardQuestionCount: number, maxParticipants?: number | null, topics?: Array<{ __typename?: 'Topic', title: string }> | null, answers?: Array<{ __typename?: 'Answer', id: string }> | null, authorId: { __typename?: 'User', id: string, role?: { __typename?: 'Role', title: RoleTitle } | null, profile?: { __typename: 'Student', id: string } | { __typename: 'Teacher', id: string, firstName?: string | null, lastName?: string | null } | null } }> | null } | null };

export type CreateMessageMutationVariables = Exact<{
  input: CreateMessageDto;
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: { __typename?: 'Message', id: string, type: MessageType, content: string, created: any, updated: any, authorId: { __typename?: 'User', id: string, role?: { __typename?: 'Role', title: RoleTitle } | null, profile?: { __typename: 'Student', id: string, level: StudentLevel, country?: string | null, created: any, firstName?: string | null, lastName?: string | null, personalImage?: string | null } | { __typename: 'Teacher', id: string, country?: string | null, created: any, firstName?: string | null, lastName?: string | null, dateOfBirth?: any | null, personalImage?: string | null } | null }, recipientId?: { __typename?: 'User', id: string } | null } };

export type DeleteMessageMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteMessageMutation = { __typename?: 'Mutation', deleteMessage: { __typename?: 'Message', id: string } };

export type SendNotificationsMutationVariables = Exact<{
  input: SendMessageDto;
}>;


export type SendNotificationsMutation = { __typename?: 'Mutation', sendNotifications?: { __typename?: 'Message', id: string } | null };

export type CountAllNotificationsForAdminQueryVariables = Exact<{ [key: string]: never; }>;


export type CountAllNotificationsForAdminQuery = { __typename?: 'Query', countAllNotificationsForAdmin: number };

export type FindLastMessagesQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type FindLastMessagesQuery = { __typename?: 'Query', findLastMessages: Array<{ __typename?: 'Message', id: string, type: MessageType, content: string, created: any, updated: any, authorId: { __typename?: 'User', id: string, role?: { __typename?: 'Role', title: RoleTitle } | null, profile?: { __typename: 'Student', id: string, level: StudentLevel, country?: string | null, created: any, firstName?: string | null, lastName?: string | null, personalImage?: string | null } | { __typename: 'Teacher', id: string, country?: string | null, created: any, firstName?: string | null, lastName?: string | null, dateOfBirth?: any | null, personalImage?: string | null } | null }, recipientId?: { __typename?: 'User', id: string } | null }> };

export type FindLastNotificationsQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type FindLastNotificationsQuery = { __typename?: 'Query', findLastNotifications: Array<{ __typename?: 'Message', id: string, type: MessageType, content: string, created: any, updated: any, authorId: { __typename?: 'User', id: string, role?: { __typename?: 'Role', title: RoleTitle } | null, profile?: { __typename: 'Student', id: string, level: StudentLevel, country?: string | null, created: any, firstName?: string | null, lastName?: string | null, personalImage?: string | null } | { __typename: 'Teacher', id: string, country?: string | null, created: any, firstName?: string | null, lastName?: string | null, dateOfBirth?: any | null, personalImage?: string | null } | null }, recipientId?: { __typename?: 'User', id: string } | null }> };

export type PaginateMessagesQueryVariables = Exact<{
  params: MessagePaginationDto;
}>;


export type PaginateMessagesQuery = { __typename?: 'Query', paginateMessages?: { __typename?: 'MessagePaginationResponse', total: number, data?: Array<{ __typename?: 'Message', id: string, type: MessageType, content: string, created: any, updated: any, authorId: { __typename?: 'User', id: string, role?: { __typename?: 'Role', title: RoleTitle } | null, profile?: { __typename: 'Student', id: string, level: StudentLevel, country?: string | null, created: any, firstName?: string | null, lastName?: string | null, personalImage?: string | null } | { __typename: 'Teacher', id: string, country?: string | null, created: any, firstName?: string | null, lastName?: string | null, dateOfBirth?: any | null, personalImage?: string | null } | null }, recipientId?: { __typename?: 'User', id: string } | null }> | null } | null };

export type PaginateNotificationsQueryVariables = Exact<{
  params: MessagePaginationDto;
}>;


export type PaginateNotificationsQuery = { __typename?: 'Query', paginateNotifications?: { __typename?: 'MessagePaginationResponse', total: number, data?: Array<{ __typename?: 'Message', id: string, type: MessageType, content: string, created: any, updated: any, authorId: { __typename?: 'User', id: string, role?: { __typename?: 'Role', title: RoleTitle } | null, profile?: { __typename: 'Student', id: string, level: StudentLevel, country?: string | null, created: any, firstName?: string | null, lastName?: string | null, personalImage?: string | null } | { __typename: 'Teacher', id: string, country?: string | null, created: any, firstName?: string | null, lastName?: string | null, dateOfBirth?: any | null, personalImage?: string | null } | null }, recipientId?: { __typename?: 'User', id: string } | null }> | null } | null };

export type CreateSubscriptionPlanMutationVariables = Exact<{
  input: CreateSubscriptionPlansDto;
}>;


export type CreateSubscriptionPlanMutation = { __typename?: 'Mutation', createSubscriptionPlan: { __typename?: 'SubscriptionPlan', id: string } };

export type DeleteSubscriptionPlanMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteSubscriptionPlanMutation = { __typename?: 'Mutation', deleteSubscriptionPlanById?: { __typename?: 'SubscriptionPlan', id: string } | null };

export type UpdateSubscriptionPlanMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateSubscriptionPlansDto;
}>;


export type UpdateSubscriptionPlanMutation = { __typename?: 'Mutation', updateSubscriptionPlan: { __typename?: 'SubscriptionPlan', id: string, title: string } };

export type FindAllSubscriptionPlansQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllSubscriptionPlansQuery = { __typename?: 'Query', findAllSubscriptionPlans: Array<{ __typename?: 'SubscriptionPlan', id: string, title: string, subTitle: string, price: number, period: number, allowedContests: number, options: Array<string>, created: any, updated: any }> };

export type FindMembershipByProfileIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type FindMembershipByProfileIdQuery = { __typename?: 'Query', findMembershipByProfileId?: { __typename?: 'Membership', id: string, status: MembershipStatus, endDate?: any | null, startDate?: any | null, renewCount: number, created: any, updated: any, memberShipOn: Array<{ __typename?: 'SubscriptionPlan', id: string, title: string, subTitle: string, price: number, period: number, allowedContests: number }> } | null };

export type CreateQuestionMutationVariables = Exact<{
  input: CreateQuestionDto;
}>;


export type CreateQuestionMutation = { __typename?: 'Mutation', createQuestion: { __typename?: 'Question', id: string, type: QuestionType, title: string, options: Array<string>, usedCount?: number | null, published: boolean, created: any, updated: any } };

export type DeleteQuestionMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteQuestionMutation = { __typename?: 'Mutation', deleteQuestionById?: { __typename?: 'Question', id: string } | null };

export type UpdateQuestionMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateQuestionDto;
}>;


export type UpdateQuestionMutation = { __typename?: 'Mutation', updateQuestion: { __typename?: 'Question', id: string, type: QuestionType, title: string, options: Array<string>, usedCount?: number | null, published: boolean, created: any, updated: any } };

export type PaginateQuestionsQueryVariables = Exact<{
  params: QuestionPaginationDto;
}>;


export type PaginateQuestionsQuery = { __typename?: 'Query', paginateQuestions?: { __typename?: 'QuestionPaginationResponse', total: number, data?: Array<{ __typename?: 'Question', id: string, title: string, type: QuestionType, options: Array<string>, lesson: string, correctAnswer?: string | null, created: any, updated: any, usedCount?: number | null, topics?: Array<{ __typename?: 'Topic', id: string, title: string }> | null }> | null } | null };

export type FindTopicsQueryVariables = Exact<{
  title?: InputMaybe<Scalars['String']>;
  level?: InputMaybe<Array<StudentLevel> | StudentLevel>;
}>;


export type FindTopicsQuery = { __typename?: 'Query', findTopics?: Array<{ __typename?: 'Topic', id: string, title: string, level: Array<StudentLevel> }> | null };

export type FindAllTopicsQueryVariables = Exact<{
  take?: InputMaybe<Scalars['Int']>;
}>;


export type FindAllTopicsQuery = { __typename?: 'Query', findAllTopics?: Array<{ __typename?: 'Topic', id: string, title: string }> | null };

export type ConnectStudentToTeacherMutationVariables = Exact<{
  id: Scalars['String'];
  studentId: Scalars['String'];
  connect: Scalars['Boolean'];
}>;


export type ConnectStudentToTeacherMutation = { __typename?: 'Mutation', connectStudentToTeacher: { __typename?: 'Teacher', id: string } };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUserById?: { __typename?: 'User', id: string } | null };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateUserDto;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, email: string } };

export type UpdateStudentDocumentsMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateDocumentsDto;
}>;


export type UpdateStudentDocumentsMutation = { __typename?: 'Mutation', updateStudentDocuments: { __typename?: 'User', id: string, key: number, email: string, isActive: boolean, emailConfirmed: boolean, role?: { __typename?: 'Role', title: RoleTitle } | null, profile?: { __typename: 'Student', id: string, firstName?: string | null, lastName?: string | null, level: StudentLevel, country?: string | null, personalImage?: string | null, birthCertImage?: string | null, letterImage?: string | null, dateOfBirth?: any | null, teacher?: { __typename?: 'Teacher', id: string, firstName?: string | null, lastName?: string | null } | null } | { __typename: 'Teacher', id: string, firstName?: string | null, lastName?: string | null } | null } };

export type UpdateMessagesCountMutationVariables = Exact<{
  id: Scalars['String'];
  count: Scalars['Int'];
  isMessage: Scalars['Boolean'];
}>;


export type UpdateMessagesCountMutation = { __typename?: 'Mutation', updateMessagesCount: { __typename: 'User', id: string } };

export type UpdateStudentProfileMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateStudentDto;
}>;


export type UpdateStudentProfileMutation = { __typename?: 'Mutation', updateStudentProfile: { __typename?: 'User', id: string, key: number, email: string, isActive: boolean, emailConfirmed: boolean, role?: { __typename?: 'Role', title: RoleTitle } | null, profile?: { __typename: 'Student', id: string, firstName?: string | null, lastName?: string | null, level: StudentLevel, country?: string | null, personalImage?: string | null, birthCertImage?: string | null, letterImage?: string | null, dateOfBirth?: any | null, teacher?: { __typename?: 'Teacher', id: string, firstName?: string | null, lastName?: string | null } | null } | { __typename: 'Teacher', id: string, firstName?: string | null, lastName?: string | null } | null } };

export type UpdateTeacherProfileMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateTeacherDto;
}>;


export type UpdateTeacherProfileMutation = { __typename?: 'Mutation', updateTeacherProfile: { __typename?: 'User', id: string, key: number, email: string, isActive: boolean, emailConfirmed: boolean, role?: { __typename?: 'Role', title: RoleTitle } | null, profile?: { __typename: 'Student', id: string } | { __typename: 'Teacher', id: string, firstName?: string | null, lastName?: string | null, country?: string | null, personalImage?: string | null, dateOfBirth?: any | null, phone?: { __typename?: 'UserPhone', phone: string, phoneCode: string } | null } | null } };

export type UpdateTeacherSubscriptionMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateTeacherSubscriptionDto;
}>;


export type UpdateTeacherSubscriptionMutation = { __typename?: 'Mutation', updateTeacherSubscription: { __typename?: 'Teacher', id: string, firstName?: string | null, lastName?: string | null, country?: string | null, personalImage?: string | null, subscription?: { __typename?: 'Membership', id: string, status: MembershipStatus, endDate?: any | null, startDate?: any | null, created: any, memberShipOn: Array<{ __typename?: 'SubscriptionPlan', id: string, title: string, price: number }> } | null } };

export type FindAdminAndTeacherQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type FindAdminAndTeacherQuery = { __typename?: 'Query', findAdminAndTeacher: Array<{ __typename?: 'User', id: string, created: any, role?: { __typename?: 'Role', title: RoleTitle } | null, profile?: { __typename: 'Student', id: string } | { __typename: 'Teacher', id: string, firstName?: string | null, lastName?: string | null, personalImage?: string | null } | null }> };

export type FindStudentsQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  teacherId?: InputMaybe<Scalars['String']>;
}>;


export type FindStudentsQuery = { __typename?: 'Query', findStudents: Array<{ __typename?: 'User', id: string, isActive: boolean, role?: { __typename?: 'Role', title: RoleTitle } | null, profile?: { __typename: 'Student', id: string, firstName?: string | null, lastName?: string | null } | { __typename: 'Teacher' } | null }> };

export type FindTeacherQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
}>;


export type FindTeacherQuery = { __typename?: 'Query', findTeacher: Array<{ __typename?: 'User', id: string, key: number, email: string, isActive: boolean, role?: { __typename?: 'Role', title: RoleTitle } | null, profile?: { __typename: 'Student' } | { __typename: 'Teacher', id: string, firstName?: string | null, lastName?: string | null, country?: string | null, personalImage?: string | null } | null }> };

export type FindUserQueryVariables = Exact<{
  key: Scalars['Int'];
}>;


export type FindUserQuery = { __typename?: 'Query', findUser: { __typename?: 'User', id: string, key: number, email: string, emailConfirmed: boolean, isActive: boolean, created: any, role?: { __typename?: 'Role', title: RoleTitle } | null, profile?: { __typename: 'Student', id: string, level: StudentLevel, country?: string | null, firstName?: string | null, lastName?: string | null, dateOfBirth?: any | null, letterImage?: string | null, personalImage?: string | null, birthCertImage?: string | null, teacher?: { __typename?: 'Teacher', id: string, country?: string | null, firstName?: string | null, lastName?: string | null, personalImage?: string | null } | null } | { __typename: 'Teacher', id: string, country?: string | null, firstName?: string | null, lastName?: string | null, dateOfBirth?: any | null, personalImage?: string | null, phone?: { __typename?: 'UserPhone', phone: string, phoneCode: string } | null, subscription?: { __typename?: 'Membership', id: string, status: MembershipStatus, startDate?: any | null, endDate?: any | null, created: any, renewCount: number, memberShipOn: Array<{ __typename?: 'SubscriptionPlan', id: string, title: string, price: number }> } | null } | null } };

export type GetAuthUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAuthUserQuery = { __typename?: 'Query', getAuthUser: { __typename?: 'User', id: string, key: number, email: string, isActive: boolean, emailConfirmed: boolean, countAllNotifications?: number | null, countAllMessages?: number | null, messagesCount: number, notificationsCount: number, role?: { __typename?: 'Role', title: RoleTitle, permissions?: Array<{ __typename?: 'Permission', title: PermissionTitle }> | null } | null, profile?: { __typename: 'Student', id: string, firstName?: string | null, lastName?: string | null, level: StudentLevel, country?: string | null, personalImage?: string | null, birthCertImage?: string | null, letterImage?: string | null, dateOfBirth?: any | null, teacher?: { __typename?: 'Teacher', id: string, firstName?: string | null, lastName?: string | null, userId?: string | null } | null } | { __typename: 'Teacher', id: string, country?: string | null, firstName?: string | null, lastName?: string | null, dateOfBirth?: any | null, personalImage?: string | null, phone?: { __typename?: 'UserPhone', phone: string, phoneCode: string } | null, subscription?: { __typename?: 'Membership', id: string, status: MembershipStatus, startDate?: any | null, endDate?: any | null, created: any, renewCount: number, memberShipOn: Array<{ __typename?: 'SubscriptionPlan', id: string, title: string, price: number }> } | null } | null } };

export type PaginateUsersQueryVariables = Exact<{
  params: UserPaginationDto;
}>;


export type PaginateUsersQuery = { __typename?: 'Query', paginateUsers?: { __typename?: 'UserPaginationResponse', total: number, data?: Array<{ __typename?: 'User', id: string, key: number, isActive: boolean, created: any, emailConfirmed: boolean, role?: { __typename?: 'Role', title: RoleTitle } | null, profile?: { __typename: 'Student', id: string, firstName?: string | null, lastName?: string | null, level: StudentLevel, country?: string | null, personalImage?: string | null } | { __typename: 'Teacher', id: string, firstName?: string | null, lastName?: string | null, country?: string | null, personalImage?: string | null } | null }> | null } | null };

export type SearchUsersQueryVariables = Exact<{
  params: UserPaginationDto;
}>;


export type SearchUsersQuery = { __typename?: 'Query', searchUsers?: Array<{ __typename: 'Student', id: string, firstName?: string | null, lastName?: string | null, userId?: string | null, personalImage?: string | null } | { __typename: 'Teacher', id: string, firstName?: string | null, lastName?: string | null, userId?: string | null, personalImage?: string | null }> | null };

export type TeacherDashboardQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type TeacherDashboardQuery = { __typename?: 'Query', teacherDashboard?: { __typename?: 'TeacherDashboardResponse', meTotal: number, total: number } | null };


export const CreateAnswerDocument = gql`
    mutation CreateAnswer($data: CreateAnswerDto!) {
  createAnswer(data: $data) {
    id
    created
    updated
  }
}
    `;
export type CreateAnswerMutationFn = Apollo.MutationFunction<CreateAnswerMutation, CreateAnswerMutationVariables>;

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
export function useCreateAnswerMutation(baseOptions?: Apollo.MutationHookOptions<CreateAnswerMutation, CreateAnswerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAnswerMutation, CreateAnswerMutationVariables>(CreateAnswerDocument, options);
      }
export type CreateAnswerMutationHookResult = ReturnType<typeof useCreateAnswerMutation>;
export type CreateAnswerMutationResult = Apollo.MutationResult<CreateAnswerMutation>;
export type CreateAnswerMutationOptions = Apollo.BaseMutationOptions<CreateAnswerMutation, CreateAnswerMutationVariables>;
export const UpdateAnswerDocument = gql`
    mutation UpdateAnswer($id: String!, $data: UpdateAnswerDto!) {
  updateAnswer(id: $id, data: $data) {
    id
    created
    updated
  }
}
    `;
export type UpdateAnswerMutationFn = Apollo.MutationFunction<UpdateAnswerMutation, UpdateAnswerMutationVariables>;

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
export function useUpdateAnswerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAnswerMutation, UpdateAnswerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAnswerMutation, UpdateAnswerMutationVariables>(UpdateAnswerDocument, options);
      }
export type UpdateAnswerMutationHookResult = ReturnType<typeof useUpdateAnswerMutation>;
export type UpdateAnswerMutationResult = Apollo.MutationResult<UpdateAnswerMutation>;
export type UpdateAnswerMutationOptions = Apollo.BaseMutationOptions<UpdateAnswerMutation, UpdateAnswerMutationVariables>;
export const FindOneAnswerByIdDocument = gql`
    query FindOneAnswerById($id: String!) {
  findOneAnswerById(id: $id) {
    userId {
      id
    }
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
export function useFindOneAnswerByIdQuery(baseOptions: Apollo.QueryHookOptions<FindOneAnswerByIdQuery, FindOneAnswerByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindOneAnswerByIdQuery, FindOneAnswerByIdQueryVariables>(FindOneAnswerByIdDocument, options);
      }
export function useFindOneAnswerByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindOneAnswerByIdQuery, FindOneAnswerByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindOneAnswerByIdQuery, FindOneAnswerByIdQueryVariables>(FindOneAnswerByIdDocument, options);
        }
export type FindOneAnswerByIdQueryHookResult = ReturnType<typeof useFindOneAnswerByIdQuery>;
export type FindOneAnswerByIdLazyQueryHookResult = ReturnType<typeof useFindOneAnswerByIdLazyQuery>;
export type FindOneAnswerByIdQueryResult = Apollo.QueryResult<FindOneAnswerByIdQuery, FindOneAnswerByIdQueryVariables>;
export const PaginateAnswersDocument = gql`
    query PaginateAnswers($params: AnswerPaginationDto!) {
  paginateAnswers(params: $params) {
    total
    data {
      id
      created
      userId {
        role {
          title
        }
        profile {
          __typename
          ... on Teacher {
            id
          }
          ... on Student {
            id
            firstName
            lastName
          }
        }
      }
      contest {
        id
        title
        authorId {
          id
          role {
            title
          }
          profile {
            __typename
            ... on Teacher {
              id
              firstName
              lastName
            }
            ... on Student {
              id
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __usePaginateAnswersQuery__
 *
 * To run a query within a React component, call `usePaginateAnswersQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaginateAnswersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaginateAnswersQuery({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function usePaginateAnswersQuery(baseOptions: Apollo.QueryHookOptions<PaginateAnswersQuery, PaginateAnswersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaginateAnswersQuery, PaginateAnswersQueryVariables>(PaginateAnswersDocument, options);
      }
export function usePaginateAnswersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaginateAnswersQuery, PaginateAnswersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaginateAnswersQuery, PaginateAnswersQueryVariables>(PaginateAnswersDocument, options);
        }
export type PaginateAnswersQueryHookResult = ReturnType<typeof usePaginateAnswersQuery>;
export type PaginateAnswersLazyQueryHookResult = ReturnType<typeof usePaginateAnswersLazyQuery>;
export type PaginateAnswersQueryResult = Apollo.QueryResult<PaginateAnswersQuery, PaginateAnswersQueryVariables>;
export const SendContactUsFormDocument = gql`
    mutation SendContactUsForm($input: ContactUsDto!) {
  sendContactUsForm(input: $input) {
    envelopeTime
    messageId
  }
}
    `;
export type SendContactUsFormMutationFn = Apollo.MutationFunction<SendContactUsFormMutation, SendContactUsFormMutationVariables>;

/**
 * __useSendContactUsFormMutation__
 *
 * To run a mutation, you first call `useSendContactUsFormMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendContactUsFormMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendContactUsFormMutation, { data, loading, error }] = useSendContactUsFormMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendContactUsFormMutation(baseOptions?: Apollo.MutationHookOptions<SendContactUsFormMutation, SendContactUsFormMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendContactUsFormMutation, SendContactUsFormMutationVariables>(SendContactUsFormDocument, options);
      }
export type SendContactUsFormMutationHookResult = ReturnType<typeof useSendContactUsFormMutation>;
export type SendContactUsFormMutationResult = Apollo.MutationResult<SendContactUsFormMutation>;
export type SendContactUsFormMutationOptions = Apollo.BaseMutationOptions<SendContactUsFormMutation, SendContactUsFormMutationVariables>;
export const UpdateAppConfigDocument = gql`
    mutation UpdateAppConfig($input: UpdateAppConfigDto!) {
  updateAppConfig(input: $input) {
    id
  }
}
    `;
export type UpdateAppConfigMutationFn = Apollo.MutationFunction<UpdateAppConfigMutation, UpdateAppConfigMutationVariables>;

/**
 * __useUpdateAppConfigMutation__
 *
 * To run a mutation, you first call `useUpdateAppConfigMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAppConfigMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAppConfigMutation, { data, loading, error }] = useUpdateAppConfigMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAppConfigMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAppConfigMutation, UpdateAppConfigMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAppConfigMutation, UpdateAppConfigMutationVariables>(UpdateAppConfigDocument, options);
      }
export type UpdateAppConfigMutationHookResult = ReturnType<typeof useUpdateAppConfigMutation>;
export type UpdateAppConfigMutationResult = Apollo.MutationResult<UpdateAppConfigMutation>;
export type UpdateAppConfigMutationOptions = Apollo.BaseMutationOptions<UpdateAppConfigMutation, UpdateAppConfigMutationVariables>;
export const DashboardDocument = gql`
    query Dashboard {
  dashboard {
    teachers
    students
    studentTeacher
    levels {
      level
      value
    }
  }
}
    `;

/**
 * __useDashboardQuery__
 *
 * To run a query within a React component, call `useDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardQuery({
 *   variables: {
 *   },
 * });
 */
export function useDashboardQuery(baseOptions?: Apollo.QueryHookOptions<DashboardQuery, DashboardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DashboardQuery, DashboardQueryVariables>(DashboardDocument, options);
      }
export function useDashboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashboardQuery, DashboardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DashboardQuery, DashboardQueryVariables>(DashboardDocument, options);
        }
export type DashboardQueryHookResult = ReturnType<typeof useDashboardQuery>;
export type DashboardLazyQueryHookResult = ReturnType<typeof useDashboardLazyQuery>;
export type DashboardQueryResult = Apollo.QueryResult<DashboardQuery, DashboardQueryVariables>;
export const FindAppConfigDocument = gql`
    query FindAppConfig {
  findAppConfig {
    title
    description
    contactEmail
    appStorUrl
    playStorUrl
    youtubeUrl
    twitterUrl
    facebookUrl
    instagramUrl
  }
}
    `;

/**
 * __useFindAppConfigQuery__
 *
 * To run a query within a React component, call `useFindAppConfigQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAppConfigQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAppConfigQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAppConfigQuery(baseOptions?: Apollo.QueryHookOptions<FindAppConfigQuery, FindAppConfigQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAppConfigQuery, FindAppConfigQueryVariables>(FindAppConfigDocument, options);
      }
export function useFindAppConfigLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAppConfigQuery, FindAppConfigQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAppConfigQuery, FindAppConfigQueryVariables>(FindAppConfigDocument, options);
        }
export type FindAppConfigQueryHookResult = ReturnType<typeof useFindAppConfigQuery>;
export type FindAppConfigLazyQueryHookResult = ReturnType<typeof useFindAppConfigLazyQuery>;
export type FindAppConfigQueryResult = Apollo.QueryResult<FindAppConfigQuery, FindAppConfigQueryVariables>;
export const FindAboutUsPageDocument = gql`
    query FindAboutUsPage {
  findAppConfig {
    aboutUs
    title
    description
    appStorUrl
    playStorUrl
    youtubeUrl
    twitterUrl
    facebookUrl
    instagramUrl
  }
}
    `;

/**
 * __useFindAboutUsPageQuery__
 *
 * To run a query within a React component, call `useFindAboutUsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAboutUsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAboutUsPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAboutUsPageQuery(baseOptions?: Apollo.QueryHookOptions<FindAboutUsPageQuery, FindAboutUsPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAboutUsPageQuery, FindAboutUsPageQueryVariables>(FindAboutUsPageDocument, options);
      }
export function useFindAboutUsPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAboutUsPageQuery, FindAboutUsPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAboutUsPageQuery, FindAboutUsPageQueryVariables>(FindAboutUsPageDocument, options);
        }
export type FindAboutUsPageQueryHookResult = ReturnType<typeof useFindAboutUsPageQuery>;
export type FindAboutUsPageLazyQueryHookResult = ReturnType<typeof useFindAboutUsPageLazyQuery>;
export type FindAboutUsPageQueryResult = Apollo.QueryResult<FindAboutUsPageQuery, FindAboutUsPageQueryVariables>;
export const FindPrivacyPolicyPageDocument = gql`
    query FindPrivacyPolicyPage {
  findAppConfig {
    privacy
    title
    description
    appStorUrl
    playStorUrl
    youtubeUrl
    twitterUrl
    facebookUrl
    instagramUrl
  }
}
    `;

/**
 * __useFindPrivacyPolicyPageQuery__
 *
 * To run a query within a React component, call `useFindPrivacyPolicyPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindPrivacyPolicyPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindPrivacyPolicyPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindPrivacyPolicyPageQuery(baseOptions?: Apollo.QueryHookOptions<FindPrivacyPolicyPageQuery, FindPrivacyPolicyPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindPrivacyPolicyPageQuery, FindPrivacyPolicyPageQueryVariables>(FindPrivacyPolicyPageDocument, options);
      }
export function useFindPrivacyPolicyPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindPrivacyPolicyPageQuery, FindPrivacyPolicyPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindPrivacyPolicyPageQuery, FindPrivacyPolicyPageQueryVariables>(FindPrivacyPolicyPageDocument, options);
        }
export type FindPrivacyPolicyPageQueryHookResult = ReturnType<typeof useFindPrivacyPolicyPageQuery>;
export type FindPrivacyPolicyPageLazyQueryHookResult = ReturnType<typeof useFindPrivacyPolicyPageLazyQuery>;
export type FindPrivacyPolicyPageQueryResult = Apollo.QueryResult<FindPrivacyPolicyPageQuery, FindPrivacyPolicyPageQueryVariables>;
export const FindTermsPageDocument = gql`
    query FindTermsPage {
  findAppConfig {
    agreement
    title
    description
    appStorUrl
    playStorUrl
    youtubeUrl
    twitterUrl
    facebookUrl
    instagramUrl
  }
}
    `;

/**
 * __useFindTermsPageQuery__
 *
 * To run a query within a React component, call `useFindTermsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindTermsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindTermsPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindTermsPageQuery(baseOptions?: Apollo.QueryHookOptions<FindTermsPageQuery, FindTermsPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindTermsPageQuery, FindTermsPageQueryVariables>(FindTermsPageDocument, options);
      }
export function useFindTermsPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindTermsPageQuery, FindTermsPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindTermsPageQuery, FindTermsPageQueryVariables>(FindTermsPageDocument, options);
        }
export type FindTermsPageQueryHookResult = ReturnType<typeof useFindTermsPageQuery>;
export type FindTermsPageLazyQueryHookResult = ReturnType<typeof useFindTermsPageLazyQuery>;
export type FindTermsPageQueryResult = Apollo.QueryResult<FindTermsPageQuery, FindTermsPageQueryVariables>;
export const ActivateEmailTokenDocument = gql`
    mutation ActivateEmailToken($input: IDDto!) {
  activateEmailToken(input: $input) {
    id
  }
}
    `;
export type ActivateEmailTokenMutationFn = Apollo.MutationFunction<ActivateEmailTokenMutation, ActivateEmailTokenMutationVariables>;

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
export function useActivateEmailTokenMutation(baseOptions?: Apollo.MutationHookOptions<ActivateEmailTokenMutation, ActivateEmailTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ActivateEmailTokenMutation, ActivateEmailTokenMutationVariables>(ActivateEmailTokenDocument, options);
      }
export type ActivateEmailTokenMutationHookResult = ReturnType<typeof useActivateEmailTokenMutation>;
export type ActivateEmailTokenMutationResult = Apollo.MutationResult<ActivateEmailTokenMutation>;
export type ActivateEmailTokenMutationOptions = Apollo.BaseMutationOptions<ActivateEmailTokenMutation, ActivateEmailTokenMutationVariables>;
export const ResendEmailActivationCodeDocument = gql`
    mutation ResendEmailActivationCode($input: EmailDto!) {
  resendEmailActivationCode(input: $input)
}
    `;
export type ResendEmailActivationCodeMutationFn = Apollo.MutationFunction<ResendEmailActivationCodeMutation, ResendEmailActivationCodeMutationVariables>;

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
export function useResendEmailActivationCodeMutation(baseOptions?: Apollo.MutationHookOptions<ResendEmailActivationCodeMutation, ResendEmailActivationCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResendEmailActivationCodeMutation, ResendEmailActivationCodeMutationVariables>(ResendEmailActivationCodeDocument, options);
      }
export type ResendEmailActivationCodeMutationHookResult = ReturnType<typeof useResendEmailActivationCodeMutation>;
export type ResendEmailActivationCodeMutationResult = Apollo.MutationResult<ResendEmailActivationCodeMutation>;
export type ResendEmailActivationCodeMutationOptions = Apollo.BaseMutationOptions<ResendEmailActivationCodeMutation, ResendEmailActivationCodeMutationVariables>;
export const EmailTokenToRecoverPasswordDocument = gql`
    mutation EmailTokenToRecoverPassword($input: EmailDto!) {
  emailTokenToRecoverPassword(input: $input)
}
    `;
export type EmailTokenToRecoverPasswordMutationFn = Apollo.MutationFunction<EmailTokenToRecoverPasswordMutation, EmailTokenToRecoverPasswordMutationVariables>;

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
export function useEmailTokenToRecoverPasswordMutation(baseOptions?: Apollo.MutationHookOptions<EmailTokenToRecoverPasswordMutation, EmailTokenToRecoverPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EmailTokenToRecoverPasswordMutation, EmailTokenToRecoverPasswordMutationVariables>(EmailTokenToRecoverPasswordDocument, options);
      }
export type EmailTokenToRecoverPasswordMutationHookResult = ReturnType<typeof useEmailTokenToRecoverPasswordMutation>;
export type EmailTokenToRecoverPasswordMutationResult = Apollo.MutationResult<EmailTokenToRecoverPasswordMutation>;
export type EmailTokenToRecoverPasswordMutationOptions = Apollo.BaseMutationOptions<EmailTokenToRecoverPasswordMutation, EmailTokenToRecoverPasswordMutationVariables>;
export const SigningDocument = gql`
    mutation Signing($input: SigningDto!) {
  signing(input: $input) {
    accessToken
    refreshToken
    tokenType
  }
}
    `;
export type SigningMutationFn = Apollo.MutationFunction<SigningMutation, SigningMutationVariables>;

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
export function useSigningMutation(baseOptions?: Apollo.MutationHookOptions<SigningMutation, SigningMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SigningMutation, SigningMutationVariables>(SigningDocument, options);
      }
export type SigningMutationHookResult = ReturnType<typeof useSigningMutation>;
export type SigningMutationResult = Apollo.MutationResult<SigningMutation>;
export type SigningMutationOptions = Apollo.BaseMutationOptions<SigningMutation, SigningMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($input: SignUpDto!) {
  signup(input: $input)
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

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
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
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
export function useFindEmailTokenQuery(baseOptions: Apollo.QueryHookOptions<FindEmailTokenQuery, FindEmailTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindEmailTokenQuery, FindEmailTokenQueryVariables>(FindEmailTokenDocument, options);
      }
export function useFindEmailTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindEmailTokenQuery, FindEmailTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindEmailTokenQuery, FindEmailTokenQueryVariables>(FindEmailTokenDocument, options);
        }
export type FindEmailTokenQueryHookResult = ReturnType<typeof useFindEmailTokenQuery>;
export type FindEmailTokenLazyQueryHookResult = ReturnType<typeof useFindEmailTokenLazyQuery>;
export type FindEmailTokenQueryResult = Apollo.QueryResult<FindEmailTokenQuery, FindEmailTokenQueryVariables>;
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
export type CreateContestMutationFn = Apollo.MutationFunction<CreateContestMutation, CreateContestMutationVariables>;

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
export function useCreateContestMutation(baseOptions?: Apollo.MutationHookOptions<CreateContestMutation, CreateContestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateContestMutation, CreateContestMutationVariables>(CreateContestDocument, options);
      }
export type CreateContestMutationHookResult = ReturnType<typeof useCreateContestMutation>;
export type CreateContestMutationResult = Apollo.MutationResult<CreateContestMutation>;
export type CreateContestMutationOptions = Apollo.BaseMutationOptions<CreateContestMutation, CreateContestMutationVariables>;
export const DeleteContestDocument = gql`
    mutation DeleteContest($id: String!) {
  deleteContestById(id: $id) {
    id
  }
}
    `;
export type DeleteContestMutationFn = Apollo.MutationFunction<DeleteContestMutation, DeleteContestMutationVariables>;

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
export function useDeleteContestMutation(baseOptions?: Apollo.MutationHookOptions<DeleteContestMutation, DeleteContestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteContestMutation, DeleteContestMutationVariables>(DeleteContestDocument, options);
      }
export type DeleteContestMutationHookResult = ReturnType<typeof useDeleteContestMutation>;
export type DeleteContestMutationResult = Apollo.MutationResult<DeleteContestMutation>;
export type DeleteContestMutationOptions = Apollo.BaseMutationOptions<DeleteContestMutation, DeleteContestMutationVariables>;
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
    startTime
    easyQuestionCount
    mediumQuestionCount
    hardQuestionCount
    participants
  }
}
    `;
export type UpdateContestMutationFn = Apollo.MutationFunction<UpdateContestMutation, UpdateContestMutationVariables>;

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
export function useUpdateContestMutation(baseOptions?: Apollo.MutationHookOptions<UpdateContestMutation, UpdateContestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateContestMutation, UpdateContestMutationVariables>(UpdateContestDocument, options);
      }
export type UpdateContestMutationHookResult = ReturnType<typeof useUpdateContestMutation>;
export type UpdateContestMutationResult = Apollo.MutationResult<UpdateContestMutation>;
export type UpdateContestMutationOptions = Apollo.BaseMutationOptions<UpdateContestMutation, UpdateContestMutationVariables>;
export const FindByIdForExamDocument = gql`
    query FindByIdForExam($id: String!) {
  findOneContestById(id: $id) {
    id
    type
    topics {
      title
    }
    questions {
      id
      title
      options
      type
    }
    answers {
      userId {
        id
      }
    }
    title
    level
    duration
    published
    countries
    created
    updated
    status
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
export function useFindByIdForExamQuery(baseOptions: Apollo.QueryHookOptions<FindByIdForExamQuery, FindByIdForExamQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindByIdForExamQuery, FindByIdForExamQueryVariables>(FindByIdForExamDocument, options);
      }
export function useFindByIdForExamLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindByIdForExamQuery, FindByIdForExamQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindByIdForExamQuery, FindByIdForExamQueryVariables>(FindByIdForExamDocument, options);
        }
export type FindByIdForExamQueryHookResult = ReturnType<typeof useFindByIdForExamQuery>;
export type FindByIdForExamLazyQueryHookResult = ReturnType<typeof useFindByIdForExamLazyQuery>;
export type FindByIdForExamQueryResult = Apollo.QueryResult<FindByIdForExamQuery, FindByIdForExamQueryVariables>;
export const FindByIdForReviewDocument = gql`
    query FindByIdForReview($id: String!, $answerId: String) {
  findOneContestById(id: $id, answerId: $answerId) {
    id
    type
    topics {
      title
    }
    questions {
      id
      title
      options
      type
      topics {
        title
      }
      correctAnswer
      usedCount
      lesson
    }
    answers {
      id
      contestId
      userId {
        id
      }
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
export function useFindByIdForReviewQuery(baseOptions: Apollo.QueryHookOptions<FindByIdForReviewQuery, FindByIdForReviewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindByIdForReviewQuery, FindByIdForReviewQueryVariables>(FindByIdForReviewDocument, options);
      }
export function useFindByIdForReviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindByIdForReviewQuery, FindByIdForReviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindByIdForReviewQuery, FindByIdForReviewQueryVariables>(FindByIdForReviewDocument, options);
        }
export type FindByIdForReviewQueryHookResult = ReturnType<typeof useFindByIdForReviewQuery>;
export type FindByIdForReviewLazyQueryHookResult = ReturnType<typeof useFindByIdForReviewLazyQuery>;
export type FindByIdForReviewQueryResult = Apollo.QueryResult<FindByIdForReviewQuery, FindByIdForReviewQueryVariables>;
export const PaginateContestsDocument = gql`
    query PaginateContests($params: ContestPaginationDto!) {
  paginateContest(params: $params) {
    total
    data {
      id
      type
      topics {
        title
      }
      answers {
        id
      }
      authorId {
        id
        role {
          title
        }
        profile {
          __typename
          ... on Teacher {
            id
            firstName
            lastName
          }
          ... on Student {
            id
          }
        }
      }
      title
      level
      duration
      published
      countries
      created
      updated
      status
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
export function usePaginateContestsQuery(baseOptions: Apollo.QueryHookOptions<PaginateContestsQuery, PaginateContestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaginateContestsQuery, PaginateContestsQueryVariables>(PaginateContestsDocument, options);
      }
export function usePaginateContestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaginateContestsQuery, PaginateContestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaginateContestsQuery, PaginateContestsQueryVariables>(PaginateContestsDocument, options);
        }
export type PaginateContestsQueryHookResult = ReturnType<typeof usePaginateContestsQuery>;
export type PaginateContestsLazyQueryHookResult = ReturnType<typeof usePaginateContestsLazyQuery>;
export type PaginateContestsQueryResult = Apollo.QueryResult<PaginateContestsQuery, PaginateContestsQueryVariables>;
export const CreateMessageDocument = gql`
    mutation CreateMessage($input: CreateMessageDto!) {
  createMessage(input: $input) {
    id
    type
    content
    created
    updated
    authorId {
      id
      role {
        title
      }
      profile {
        __typename
        ... on Teacher {
          id
          country
          created
          firstName
          lastName
          dateOfBirth
          personalImage
        }
        ... on Student {
          id
          level
          country
          created
          firstName
          lastName
          personalImage
        }
      }
    }
    recipientId {
      id
    }
  }
}
    `;
export type CreateMessageMutationFn = Apollo.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, options);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
export const DeleteMessageDocument = gql`
    mutation DeleteMessage($id: String!) {
  deleteMessage(id: $id) {
    id
  }
}
    `;
export type DeleteMessageMutationFn = Apollo.MutationFunction<DeleteMessageMutation, DeleteMessageMutationVariables>;

/**
 * __useDeleteMessageMutation__
 *
 * To run a mutation, you first call `useDeleteMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageMutation, { data, loading, error }] = useDeleteMessageMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMessageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMessageMutation, DeleteMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(DeleteMessageDocument, options);
      }
export type DeleteMessageMutationHookResult = ReturnType<typeof useDeleteMessageMutation>;
export type DeleteMessageMutationResult = Apollo.MutationResult<DeleteMessageMutation>;
export type DeleteMessageMutationOptions = Apollo.BaseMutationOptions<DeleteMessageMutation, DeleteMessageMutationVariables>;
export const SendNotificationsDocument = gql`
    mutation SendNotifications($input: SendMessageDto!) {
  sendNotifications(input: $input) {
    id
  }
}
    `;
export type SendNotificationsMutationFn = Apollo.MutationFunction<SendNotificationsMutation, SendNotificationsMutationVariables>;

/**
 * __useSendNotificationsMutation__
 *
 * To run a mutation, you first call `useSendNotificationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendNotificationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendNotificationsMutation, { data, loading, error }] = useSendNotificationsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendNotificationsMutation(baseOptions?: Apollo.MutationHookOptions<SendNotificationsMutation, SendNotificationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendNotificationsMutation, SendNotificationsMutationVariables>(SendNotificationsDocument, options);
      }
export type SendNotificationsMutationHookResult = ReturnType<typeof useSendNotificationsMutation>;
export type SendNotificationsMutationResult = Apollo.MutationResult<SendNotificationsMutation>;
export type SendNotificationsMutationOptions = Apollo.BaseMutationOptions<SendNotificationsMutation, SendNotificationsMutationVariables>;
export const CountAllNotificationsForAdminDocument = gql`
    query CountAllNotificationsForAdmin {
  countAllNotificationsForAdmin
}
    `;

/**
 * __useCountAllNotificationsForAdminQuery__
 *
 * To run a query within a React component, call `useCountAllNotificationsForAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountAllNotificationsForAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountAllNotificationsForAdminQuery({
 *   variables: {
 *   },
 * });
 */
export function useCountAllNotificationsForAdminQuery(baseOptions?: Apollo.QueryHookOptions<CountAllNotificationsForAdminQuery, CountAllNotificationsForAdminQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CountAllNotificationsForAdminQuery, CountAllNotificationsForAdminQueryVariables>(CountAllNotificationsForAdminDocument, options);
      }
export function useCountAllNotificationsForAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountAllNotificationsForAdminQuery, CountAllNotificationsForAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CountAllNotificationsForAdminQuery, CountAllNotificationsForAdminQueryVariables>(CountAllNotificationsForAdminDocument, options);
        }
export type CountAllNotificationsForAdminQueryHookResult = ReturnType<typeof useCountAllNotificationsForAdminQuery>;
export type CountAllNotificationsForAdminLazyQueryHookResult = ReturnType<typeof useCountAllNotificationsForAdminLazyQuery>;
export type CountAllNotificationsForAdminQueryResult = Apollo.QueryResult<CountAllNotificationsForAdminQuery, CountAllNotificationsForAdminQueryVariables>;
export const FindLastMessagesDocument = gql`
    query FindLastMessages($id: String!) {
  findLastMessages(id: $id) {
    id
    type
    content
    created
    updated
    authorId {
      id
      role {
        title
      }
      profile {
        __typename
        ... on Teacher {
          id
          country
          created
          firstName
          lastName
          dateOfBirth
          personalImage
        }
        ... on Student {
          id
          level
          country
          created
          firstName
          lastName
          personalImage
        }
      }
    }
    recipientId {
      id
    }
  }
}
    `;

/**
 * __useFindLastMessagesQuery__
 *
 * To run a query within a React component, call `useFindLastMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindLastMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindLastMessagesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindLastMessagesQuery(baseOptions: Apollo.QueryHookOptions<FindLastMessagesQuery, FindLastMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindLastMessagesQuery, FindLastMessagesQueryVariables>(FindLastMessagesDocument, options);
      }
export function useFindLastMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindLastMessagesQuery, FindLastMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindLastMessagesQuery, FindLastMessagesQueryVariables>(FindLastMessagesDocument, options);
        }
export type FindLastMessagesQueryHookResult = ReturnType<typeof useFindLastMessagesQuery>;
export type FindLastMessagesLazyQueryHookResult = ReturnType<typeof useFindLastMessagesLazyQuery>;
export type FindLastMessagesQueryResult = Apollo.QueryResult<FindLastMessagesQuery, FindLastMessagesQueryVariables>;
export const FindLastNotificationsDocument = gql`
    query FindLastNotifications($id: String) {
  findLastNotifications(id: $id) {
    id
    type
    content
    created
    updated
    authorId {
      id
      role {
        title
      }
      profile {
        __typename
        ... on Teacher {
          id
          country
          created
          firstName
          lastName
          dateOfBirth
          personalImage
        }
        ... on Student {
          id
          level
          country
          created
          firstName
          lastName
          personalImage
        }
      }
    }
    recipientId {
      id
    }
  }
}
    `;

/**
 * __useFindLastNotificationsQuery__
 *
 * To run a query within a React component, call `useFindLastNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindLastNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindLastNotificationsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindLastNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<FindLastNotificationsQuery, FindLastNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindLastNotificationsQuery, FindLastNotificationsQueryVariables>(FindLastNotificationsDocument, options);
      }
export function useFindLastNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindLastNotificationsQuery, FindLastNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindLastNotificationsQuery, FindLastNotificationsQueryVariables>(FindLastNotificationsDocument, options);
        }
export type FindLastNotificationsQueryHookResult = ReturnType<typeof useFindLastNotificationsQuery>;
export type FindLastNotificationsLazyQueryHookResult = ReturnType<typeof useFindLastNotificationsLazyQuery>;
export type FindLastNotificationsQueryResult = Apollo.QueryResult<FindLastNotificationsQuery, FindLastNotificationsQueryVariables>;
export const PaginateMessagesDocument = gql`
    query PaginateMessages($params: MessagePaginationDto!) {
  paginateMessages(params: $params) {
    total
    data {
      id
      type
      content
      created
      updated
      authorId {
        id
        role {
          title
        }
        profile {
          __typename
          ... on Teacher {
            id
            country
            created
            firstName
            lastName
            dateOfBirth
            personalImage
          }
          ... on Student {
            id
            level
            country
            created
            firstName
            lastName
            personalImage
          }
        }
      }
      recipientId {
        id
      }
    }
  }
}
    `;

/**
 * __usePaginateMessagesQuery__
 *
 * To run a query within a React component, call `usePaginateMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaginateMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaginateMessagesQuery({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function usePaginateMessagesQuery(baseOptions: Apollo.QueryHookOptions<PaginateMessagesQuery, PaginateMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaginateMessagesQuery, PaginateMessagesQueryVariables>(PaginateMessagesDocument, options);
      }
export function usePaginateMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaginateMessagesQuery, PaginateMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaginateMessagesQuery, PaginateMessagesQueryVariables>(PaginateMessagesDocument, options);
        }
export type PaginateMessagesQueryHookResult = ReturnType<typeof usePaginateMessagesQuery>;
export type PaginateMessagesLazyQueryHookResult = ReturnType<typeof usePaginateMessagesLazyQuery>;
export type PaginateMessagesQueryResult = Apollo.QueryResult<PaginateMessagesQuery, PaginateMessagesQueryVariables>;
export const PaginateNotificationsDocument = gql`
    query PaginateNotifications($params: MessagePaginationDto!) {
  paginateNotifications(params: $params) {
    total
    data {
      id
      type
      content
      created
      updated
      authorId {
        id
        role {
          title
        }
        profile {
          __typename
          ... on Teacher {
            id
            country
            created
            firstName
            lastName
            dateOfBirth
            personalImage
          }
          ... on Student {
            id
            level
            country
            created
            firstName
            lastName
            personalImage
          }
        }
      }
      recipientId {
        id
      }
    }
  }
}
    `;

/**
 * __usePaginateNotificationsQuery__
 *
 * To run a query within a React component, call `usePaginateNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaginateNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaginateNotificationsQuery({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function usePaginateNotificationsQuery(baseOptions: Apollo.QueryHookOptions<PaginateNotificationsQuery, PaginateNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaginateNotificationsQuery, PaginateNotificationsQueryVariables>(PaginateNotificationsDocument, options);
      }
export function usePaginateNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaginateNotificationsQuery, PaginateNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaginateNotificationsQuery, PaginateNotificationsQueryVariables>(PaginateNotificationsDocument, options);
        }
export type PaginateNotificationsQueryHookResult = ReturnType<typeof usePaginateNotificationsQuery>;
export type PaginateNotificationsLazyQueryHookResult = ReturnType<typeof usePaginateNotificationsLazyQuery>;
export type PaginateNotificationsQueryResult = Apollo.QueryResult<PaginateNotificationsQuery, PaginateNotificationsQueryVariables>;
export const CreateSubscriptionPlanDocument = gql`
    mutation CreateSubscriptionPlan($input: CreateSubscriptionPlansDto!) {
  createSubscriptionPlan(input: $input) {
    id
  }
}
    `;
export type CreateSubscriptionPlanMutationFn = Apollo.MutationFunction<CreateSubscriptionPlanMutation, CreateSubscriptionPlanMutationVariables>;

/**
 * __useCreateSubscriptionPlanMutation__
 *
 * To run a mutation, you first call `useCreateSubscriptionPlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubscriptionPlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubscriptionPlanMutation, { data, loading, error }] = useCreateSubscriptionPlanMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSubscriptionPlanMutation(baseOptions?: Apollo.MutationHookOptions<CreateSubscriptionPlanMutation, CreateSubscriptionPlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSubscriptionPlanMutation, CreateSubscriptionPlanMutationVariables>(CreateSubscriptionPlanDocument, options);
      }
export type CreateSubscriptionPlanMutationHookResult = ReturnType<typeof useCreateSubscriptionPlanMutation>;
export type CreateSubscriptionPlanMutationResult = Apollo.MutationResult<CreateSubscriptionPlanMutation>;
export type CreateSubscriptionPlanMutationOptions = Apollo.BaseMutationOptions<CreateSubscriptionPlanMutation, CreateSubscriptionPlanMutationVariables>;
export const DeleteSubscriptionPlanDocument = gql`
    mutation DeleteSubscriptionPlan($id: String!) {
  deleteSubscriptionPlanById(id: $id) {
    id
  }
}
    `;
export type DeleteSubscriptionPlanMutationFn = Apollo.MutationFunction<DeleteSubscriptionPlanMutation, DeleteSubscriptionPlanMutationVariables>;

/**
 * __useDeleteSubscriptionPlanMutation__
 *
 * To run a mutation, you first call `useDeleteSubscriptionPlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSubscriptionPlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSubscriptionPlanMutation, { data, loading, error }] = useDeleteSubscriptionPlanMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSubscriptionPlanMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSubscriptionPlanMutation, DeleteSubscriptionPlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSubscriptionPlanMutation, DeleteSubscriptionPlanMutationVariables>(DeleteSubscriptionPlanDocument, options);
      }
export type DeleteSubscriptionPlanMutationHookResult = ReturnType<typeof useDeleteSubscriptionPlanMutation>;
export type DeleteSubscriptionPlanMutationResult = Apollo.MutationResult<DeleteSubscriptionPlanMutation>;
export type DeleteSubscriptionPlanMutationOptions = Apollo.BaseMutationOptions<DeleteSubscriptionPlanMutation, DeleteSubscriptionPlanMutationVariables>;
export const UpdateSubscriptionPlanDocument = gql`
    mutation UpdateSubscriptionPlan($id: String!, $input: UpdateSubscriptionPlansDto!) {
  updateSubscriptionPlan(id: $id, input: $input) {
    id
    title
  }
}
    `;
export type UpdateSubscriptionPlanMutationFn = Apollo.MutationFunction<UpdateSubscriptionPlanMutation, UpdateSubscriptionPlanMutationVariables>;

/**
 * __useUpdateSubscriptionPlanMutation__
 *
 * To run a mutation, you first call `useUpdateSubscriptionPlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSubscriptionPlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSubscriptionPlanMutation, { data, loading, error }] = useUpdateSubscriptionPlanMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSubscriptionPlanMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSubscriptionPlanMutation, UpdateSubscriptionPlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSubscriptionPlanMutation, UpdateSubscriptionPlanMutationVariables>(UpdateSubscriptionPlanDocument, options);
      }
export type UpdateSubscriptionPlanMutationHookResult = ReturnType<typeof useUpdateSubscriptionPlanMutation>;
export type UpdateSubscriptionPlanMutationResult = Apollo.MutationResult<UpdateSubscriptionPlanMutation>;
export type UpdateSubscriptionPlanMutationOptions = Apollo.BaseMutationOptions<UpdateSubscriptionPlanMutation, UpdateSubscriptionPlanMutationVariables>;
export const FindAllSubscriptionPlansDocument = gql`
    query FindAllSubscriptionPlans {
  findAllSubscriptionPlans {
    id
    title
    subTitle
    price
    period
    allowedContests
    options
    created
    updated
  }
}
    `;

/**
 * __useFindAllSubscriptionPlansQuery__
 *
 * To run a query within a React component, call `useFindAllSubscriptionPlansQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllSubscriptionPlansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllSubscriptionPlansQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllSubscriptionPlansQuery(baseOptions?: Apollo.QueryHookOptions<FindAllSubscriptionPlansQuery, FindAllSubscriptionPlansQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllSubscriptionPlansQuery, FindAllSubscriptionPlansQueryVariables>(FindAllSubscriptionPlansDocument, options);
      }
export function useFindAllSubscriptionPlansLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllSubscriptionPlansQuery, FindAllSubscriptionPlansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllSubscriptionPlansQuery, FindAllSubscriptionPlansQueryVariables>(FindAllSubscriptionPlansDocument, options);
        }
export type FindAllSubscriptionPlansQueryHookResult = ReturnType<typeof useFindAllSubscriptionPlansQuery>;
export type FindAllSubscriptionPlansLazyQueryHookResult = ReturnType<typeof useFindAllSubscriptionPlansLazyQuery>;
export type FindAllSubscriptionPlansQueryResult = Apollo.QueryResult<FindAllSubscriptionPlansQuery, FindAllSubscriptionPlansQueryVariables>;
export const FindMembershipByProfileIdDocument = gql`
    query FindMembershipByProfileId($id: String!) {
  findMembershipByProfileId(id: $id) {
    id
    status
    endDate
    startDate
    renewCount
    created
    updated
    memberShipOn {
      id
      title
      subTitle
      price
      period
      allowedContests
    }
  }
}
    `;

/**
 * __useFindMembershipByProfileIdQuery__
 *
 * To run a query within a React component, call `useFindMembershipByProfileIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindMembershipByProfileIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindMembershipByProfileIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindMembershipByProfileIdQuery(baseOptions: Apollo.QueryHookOptions<FindMembershipByProfileIdQuery, FindMembershipByProfileIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindMembershipByProfileIdQuery, FindMembershipByProfileIdQueryVariables>(FindMembershipByProfileIdDocument, options);
      }
export function useFindMembershipByProfileIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindMembershipByProfileIdQuery, FindMembershipByProfileIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindMembershipByProfileIdQuery, FindMembershipByProfileIdQueryVariables>(FindMembershipByProfileIdDocument, options);
        }
export type FindMembershipByProfileIdQueryHookResult = ReturnType<typeof useFindMembershipByProfileIdQuery>;
export type FindMembershipByProfileIdLazyQueryHookResult = ReturnType<typeof useFindMembershipByProfileIdLazyQuery>;
export type FindMembershipByProfileIdQueryResult = Apollo.QueryResult<FindMembershipByProfileIdQuery, FindMembershipByProfileIdQueryVariables>;
export const CreateQuestionDocument = gql`
    mutation CreateQuestion($input: CreateQuestionDto!) {
  createQuestion(input: $input) {
    id
    type
    title
    options
    usedCount
    published
    created
    updated
  }
}
    `;
export type CreateQuestionMutationFn = Apollo.MutationFunction<CreateQuestionMutation, CreateQuestionMutationVariables>;

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
export function useCreateQuestionMutation(baseOptions?: Apollo.MutationHookOptions<CreateQuestionMutation, CreateQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateQuestionMutation, CreateQuestionMutationVariables>(CreateQuestionDocument, options);
      }
export type CreateQuestionMutationHookResult = ReturnType<typeof useCreateQuestionMutation>;
export type CreateQuestionMutationResult = Apollo.MutationResult<CreateQuestionMutation>;
export type CreateQuestionMutationOptions = Apollo.BaseMutationOptions<CreateQuestionMutation, CreateQuestionMutationVariables>;
export const DeleteQuestionDocument = gql`
    mutation DeleteQuestion($id: String!) {
  deleteQuestionById(id: $id) {
    id
  }
}
    `;
export type DeleteQuestionMutationFn = Apollo.MutationFunction<DeleteQuestionMutation, DeleteQuestionMutationVariables>;

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
export function useDeleteQuestionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteQuestionMutation, DeleteQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteQuestionMutation, DeleteQuestionMutationVariables>(DeleteQuestionDocument, options);
      }
export type DeleteQuestionMutationHookResult = ReturnType<typeof useDeleteQuestionMutation>;
export type DeleteQuestionMutationResult = Apollo.MutationResult<DeleteQuestionMutation>;
export type DeleteQuestionMutationOptions = Apollo.BaseMutationOptions<DeleteQuestionMutation, DeleteQuestionMutationVariables>;
export const UpdateQuestionDocument = gql`
    mutation UpdateQuestion($id: String!, $input: UpdateQuestionDto!) {
  updateQuestion(id: $id, input: $input) {
    id
    type
    title
    options
    usedCount
    published
    created
    updated
  }
}
    `;
export type UpdateQuestionMutationFn = Apollo.MutationFunction<UpdateQuestionMutation, UpdateQuestionMutationVariables>;

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
export function useUpdateQuestionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateQuestionMutation, UpdateQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateQuestionMutation, UpdateQuestionMutationVariables>(UpdateQuestionDocument, options);
      }
export type UpdateQuestionMutationHookResult = ReturnType<typeof useUpdateQuestionMutation>;
export type UpdateQuestionMutationResult = Apollo.MutationResult<UpdateQuestionMutation>;
export type UpdateQuestionMutationOptions = Apollo.BaseMutationOptions<UpdateQuestionMutation, UpdateQuestionMutationVariables>;
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
      topics {
        id
        title
      }
      created
      updated
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
export function usePaginateQuestionsQuery(baseOptions: Apollo.QueryHookOptions<PaginateQuestionsQuery, PaginateQuestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaginateQuestionsQuery, PaginateQuestionsQueryVariables>(PaginateQuestionsDocument, options);
      }
export function usePaginateQuestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaginateQuestionsQuery, PaginateQuestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaginateQuestionsQuery, PaginateQuestionsQueryVariables>(PaginateQuestionsDocument, options);
        }
export type PaginateQuestionsQueryHookResult = ReturnType<typeof usePaginateQuestionsQuery>;
export type PaginateQuestionsLazyQueryHookResult = ReturnType<typeof usePaginateQuestionsLazyQuery>;
export type PaginateQuestionsQueryResult = Apollo.QueryResult<PaginateQuestionsQuery, PaginateQuestionsQueryVariables>;
export const FindTopicsDocument = gql`
    query FindTopics($title: String, $level: [StudentLevel!]) {
  findTopics(title: $title, level: $level) {
    id
    title
    level
  }
}
    `;

/**
 * __useFindTopicsQuery__
 *
 * To run a query within a React component, call `useFindTopicsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindTopicsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindTopicsQuery({
 *   variables: {
 *      title: // value for 'title'
 *      level: // value for 'level'
 *   },
 * });
 */
export function useFindTopicsQuery(baseOptions?: Apollo.QueryHookOptions<FindTopicsQuery, FindTopicsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindTopicsQuery, FindTopicsQueryVariables>(FindTopicsDocument, options);
      }
export function useFindTopicsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindTopicsQuery, FindTopicsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindTopicsQuery, FindTopicsQueryVariables>(FindTopicsDocument, options);
        }
export type FindTopicsQueryHookResult = ReturnType<typeof useFindTopicsQuery>;
export type FindTopicsLazyQueryHookResult = ReturnType<typeof useFindTopicsLazyQuery>;
export type FindTopicsQueryResult = Apollo.QueryResult<FindTopicsQuery, FindTopicsQueryVariables>;
export const FindAllTopicsDocument = gql`
    query FindAllTopics($take: Int) {
  findAllTopics(take: $take) {
    id
    title
  }
}
    `;

/**
 * __useFindAllTopicsQuery__
 *
 * To run a query within a React component, call `useFindAllTopicsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllTopicsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllTopicsQuery({
 *   variables: {
 *      take: // value for 'take'
 *   },
 * });
 */
export function useFindAllTopicsQuery(baseOptions?: Apollo.QueryHookOptions<FindAllTopicsQuery, FindAllTopicsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllTopicsQuery, FindAllTopicsQueryVariables>(FindAllTopicsDocument, options);
      }
export function useFindAllTopicsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllTopicsQuery, FindAllTopicsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllTopicsQuery, FindAllTopicsQueryVariables>(FindAllTopicsDocument, options);
        }
export type FindAllTopicsQueryHookResult = ReturnType<typeof useFindAllTopicsQuery>;
export type FindAllTopicsLazyQueryHookResult = ReturnType<typeof useFindAllTopicsLazyQuery>;
export type FindAllTopicsQueryResult = Apollo.QueryResult<FindAllTopicsQuery, FindAllTopicsQueryVariables>;
export const ConnectStudentToTeacherDocument = gql`
    mutation ConnectStudentToTeacher($id: String!, $studentId: String!, $connect: Boolean!) {
  connectStudentToTeacher(id: $id, studentId: $studentId, connect: $connect) {
    id
  }
}
    `;
export type ConnectStudentToTeacherMutationFn = Apollo.MutationFunction<ConnectStudentToTeacherMutation, ConnectStudentToTeacherMutationVariables>;

/**
 * __useConnectStudentToTeacherMutation__
 *
 * To run a mutation, you first call `useConnectStudentToTeacherMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConnectStudentToTeacherMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [connectStudentToTeacherMutation, { data, loading, error }] = useConnectStudentToTeacherMutation({
 *   variables: {
 *      id: // value for 'id'
 *      studentId: // value for 'studentId'
 *      connect: // value for 'connect'
 *   },
 * });
 */
export function useConnectStudentToTeacherMutation(baseOptions?: Apollo.MutationHookOptions<ConnectStudentToTeacherMutation, ConnectStudentToTeacherMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConnectStudentToTeacherMutation, ConnectStudentToTeacherMutationVariables>(ConnectStudentToTeacherDocument, options);
      }
export type ConnectStudentToTeacherMutationHookResult = ReturnType<typeof useConnectStudentToTeacherMutation>;
export type ConnectStudentToTeacherMutationResult = Apollo.MutationResult<ConnectStudentToTeacherMutation>;
export type ConnectStudentToTeacherMutationOptions = Apollo.BaseMutationOptions<ConnectStudentToTeacherMutation, ConnectStudentToTeacherMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($id: String!) {
  deleteUserById(id: $id) {
    id
  }
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($id: String!, $input: UpdateUserDto!) {
  updateUser(id: $id, input: $input) {
    id
    email
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

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
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UpdateStudentDocumentsDocument = gql`
    mutation UpdateStudentDocuments($id: String!, $input: UpdateDocumentsDto!) {
  updateStudentDocuments(id: $id, input: $input) {
    id
    key
    email
    isActive
    emailConfirmed
    role {
      title
    }
    profile {
      __typename
      ... on Student {
        id
        firstName
        lastName
        level
        country
        personalImage
        birthCertImage
        letterImage
        dateOfBirth
        teacher {
          id
          firstName
          lastName
        }
      }
      ... on Teacher {
        id
        firstName
        lastName
      }
    }
  }
}
    `;
export type UpdateStudentDocumentsMutationFn = Apollo.MutationFunction<UpdateStudentDocumentsMutation, UpdateStudentDocumentsMutationVariables>;

/**
 * __useUpdateStudentDocumentsMutation__
 *
 * To run a mutation, you first call `useUpdateStudentDocumentsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStudentDocumentsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStudentDocumentsMutation, { data, loading, error }] = useUpdateStudentDocumentsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateStudentDocumentsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStudentDocumentsMutation, UpdateStudentDocumentsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStudentDocumentsMutation, UpdateStudentDocumentsMutationVariables>(UpdateStudentDocumentsDocument, options);
      }
export type UpdateStudentDocumentsMutationHookResult = ReturnType<typeof useUpdateStudentDocumentsMutation>;
export type UpdateStudentDocumentsMutationResult = Apollo.MutationResult<UpdateStudentDocumentsMutation>;
export type UpdateStudentDocumentsMutationOptions = Apollo.BaseMutationOptions<UpdateStudentDocumentsMutation, UpdateStudentDocumentsMutationVariables>;
export const UpdateMessagesCountDocument = gql`
    mutation UpdateMessagesCount($id: String!, $count: Int!, $isMessage: Boolean!) {
  updateMessagesCount(id: $id, count: $count, isMessage: $isMessage) {
    __typename
    id
  }
}
    `;
export type UpdateMessagesCountMutationFn = Apollo.MutationFunction<UpdateMessagesCountMutation, UpdateMessagesCountMutationVariables>;

/**
 * __useUpdateMessagesCountMutation__
 *
 * To run a mutation, you first call `useUpdateMessagesCountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMessagesCountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMessagesCountMutation, { data, loading, error }] = useUpdateMessagesCountMutation({
 *   variables: {
 *      id: // value for 'id'
 *      count: // value for 'count'
 *      isMessage: // value for 'isMessage'
 *   },
 * });
 */
export function useUpdateMessagesCountMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMessagesCountMutation, UpdateMessagesCountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMessagesCountMutation, UpdateMessagesCountMutationVariables>(UpdateMessagesCountDocument, options);
      }
export type UpdateMessagesCountMutationHookResult = ReturnType<typeof useUpdateMessagesCountMutation>;
export type UpdateMessagesCountMutationResult = Apollo.MutationResult<UpdateMessagesCountMutation>;
export type UpdateMessagesCountMutationOptions = Apollo.BaseMutationOptions<UpdateMessagesCountMutation, UpdateMessagesCountMutationVariables>;
export const UpdateStudentProfileDocument = gql`
    mutation UpdateStudentProfile($id: String!, $input: UpdateStudentDto!) {
  updateStudentProfile(id: $id, input: $input) {
    id
    key
    email
    isActive
    emailConfirmed
    role {
      title
    }
    profile {
      __typename
      ... on Student {
        id
        firstName
        lastName
        level
        country
        personalImage
        birthCertImage
        letterImage
        dateOfBirth
        teacher {
          id
          firstName
          lastName
        }
      }
      ... on Teacher {
        id
        firstName
        lastName
      }
    }
  }
}
    `;
export type UpdateStudentProfileMutationFn = Apollo.MutationFunction<UpdateStudentProfileMutation, UpdateStudentProfileMutationVariables>;

/**
 * __useUpdateStudentProfileMutation__
 *
 * To run a mutation, you first call `useUpdateStudentProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStudentProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStudentProfileMutation, { data, loading, error }] = useUpdateStudentProfileMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateStudentProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStudentProfileMutation, UpdateStudentProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStudentProfileMutation, UpdateStudentProfileMutationVariables>(UpdateStudentProfileDocument, options);
      }
export type UpdateStudentProfileMutationHookResult = ReturnType<typeof useUpdateStudentProfileMutation>;
export type UpdateStudentProfileMutationResult = Apollo.MutationResult<UpdateStudentProfileMutation>;
export type UpdateStudentProfileMutationOptions = Apollo.BaseMutationOptions<UpdateStudentProfileMutation, UpdateStudentProfileMutationVariables>;
export const UpdateTeacherProfileDocument = gql`
    mutation UpdateTeacherProfile($id: String!, $input: UpdateTeacherDto!) {
  updateTeacherProfile(id: $id, input: $input) {
    id
    key
    email
    isActive
    emailConfirmed
    role {
      title
    }
    profile {
      __typename
      ... on Student {
        id
      }
      ... on Teacher {
        id
        firstName
        lastName
        country
        personalImage
        phone {
          phone
          phoneCode
        }
        dateOfBirth
      }
    }
  }
}
    `;
export type UpdateTeacherProfileMutationFn = Apollo.MutationFunction<UpdateTeacherProfileMutation, UpdateTeacherProfileMutationVariables>;

/**
 * __useUpdateTeacherProfileMutation__
 *
 * To run a mutation, you first call `useUpdateTeacherProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTeacherProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTeacherProfileMutation, { data, loading, error }] = useUpdateTeacherProfileMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTeacherProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTeacherProfileMutation, UpdateTeacherProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTeacherProfileMutation, UpdateTeacherProfileMutationVariables>(UpdateTeacherProfileDocument, options);
      }
export type UpdateTeacherProfileMutationHookResult = ReturnType<typeof useUpdateTeacherProfileMutation>;
export type UpdateTeacherProfileMutationResult = Apollo.MutationResult<UpdateTeacherProfileMutation>;
export type UpdateTeacherProfileMutationOptions = Apollo.BaseMutationOptions<UpdateTeacherProfileMutation, UpdateTeacherProfileMutationVariables>;
export const UpdateTeacherSubscriptionDocument = gql`
    mutation UpdateTeacherSubscription($id: String!, $input: UpdateTeacherSubscriptionDto!) {
  updateTeacherSubscription(id: $id, input: $input) {
    id
    firstName
    lastName
    country
    personalImage
    subscription {
      id
      status
      endDate
      startDate
      created
      memberShipOn {
        id
        title
        price
      }
    }
  }
}
    `;
export type UpdateTeacherSubscriptionMutationFn = Apollo.MutationFunction<UpdateTeacherSubscriptionMutation, UpdateTeacherSubscriptionMutationVariables>;

/**
 * __useUpdateTeacherSubscriptionMutation__
 *
 * To run a mutation, you first call `useUpdateTeacherSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTeacherSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTeacherSubscriptionMutation, { data, loading, error }] = useUpdateTeacherSubscriptionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTeacherSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTeacherSubscriptionMutation, UpdateTeacherSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTeacherSubscriptionMutation, UpdateTeacherSubscriptionMutationVariables>(UpdateTeacherSubscriptionDocument, options);
      }
export type UpdateTeacherSubscriptionMutationHookResult = ReturnType<typeof useUpdateTeacherSubscriptionMutation>;
export type UpdateTeacherSubscriptionMutationResult = Apollo.MutationResult<UpdateTeacherSubscriptionMutation>;
export type UpdateTeacherSubscriptionMutationOptions = Apollo.BaseMutationOptions<UpdateTeacherSubscriptionMutation, UpdateTeacherSubscriptionMutationVariables>;
export const FindAdminAndTeacherDocument = gql`
    query FindAdminAndTeacher($id: String) {
  findAdminAndTeacher(id: $id) {
    id
    created
    role {
      title
    }
    profile {
      __typename
      ... on Teacher {
        id
        firstName
        lastName
        personalImage
      }
      ... on Student {
        id
      }
    }
  }
}
    `;

/**
 * __useFindAdminAndTeacherQuery__
 *
 * To run a query within a React component, call `useFindAdminAndTeacherQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAdminAndTeacherQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAdminAndTeacherQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindAdminAndTeacherQuery(baseOptions?: Apollo.QueryHookOptions<FindAdminAndTeacherQuery, FindAdminAndTeacherQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAdminAndTeacherQuery, FindAdminAndTeacherQueryVariables>(FindAdminAndTeacherDocument, options);
      }
export function useFindAdminAndTeacherLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAdminAndTeacherQuery, FindAdminAndTeacherQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAdminAndTeacherQuery, FindAdminAndTeacherQueryVariables>(FindAdminAndTeacherDocument, options);
        }
export type FindAdminAndTeacherQueryHookResult = ReturnType<typeof useFindAdminAndTeacherQuery>;
export type FindAdminAndTeacherLazyQueryHookResult = ReturnType<typeof useFindAdminAndTeacherLazyQuery>;
export type FindAdminAndTeacherQueryResult = Apollo.QueryResult<FindAdminAndTeacherQuery, FindAdminAndTeacherQueryVariables>;
export const FindStudentsDocument = gql`
    query FindStudents($name: String, $teacherId: String) {
  findStudents(name: $name, teacherId: $teacherId) {
    id
    isActive
    role {
      title
    }
    profile {
      __typename
      ... on Student {
        id
        firstName
        lastName
      }
    }
  }
}
    `;

/**
 * __useFindStudentsQuery__
 *
 * To run a query within a React component, call `useFindStudentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindStudentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindStudentsQuery({
 *   variables: {
 *      name: // value for 'name'
 *      teacherId: // value for 'teacherId'
 *   },
 * });
 */
export function useFindStudentsQuery(baseOptions?: Apollo.QueryHookOptions<FindStudentsQuery, FindStudentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindStudentsQuery, FindStudentsQueryVariables>(FindStudentsDocument, options);
      }
export function useFindStudentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindStudentsQuery, FindStudentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindStudentsQuery, FindStudentsQueryVariables>(FindStudentsDocument, options);
        }
export type FindStudentsQueryHookResult = ReturnType<typeof useFindStudentsQuery>;
export type FindStudentsLazyQueryHookResult = ReturnType<typeof useFindStudentsLazyQuery>;
export type FindStudentsQueryResult = Apollo.QueryResult<FindStudentsQuery, FindStudentsQueryVariables>;
export const FindTeacherDocument = gql`
    query FindTeacher($name: String) {
  findTeacher(name: $name) {
    id
    key
    email
    isActive
    role {
      title
    }
    profile {
      __typename
      ... on Teacher {
        id
        firstName
        lastName
        country
        personalImage
      }
    }
  }
}
    `;

/**
 * __useFindTeacherQuery__
 *
 * To run a query within a React component, call `useFindTeacherQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindTeacherQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindTeacherQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useFindTeacherQuery(baseOptions?: Apollo.QueryHookOptions<FindTeacherQuery, FindTeacherQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindTeacherQuery, FindTeacherQueryVariables>(FindTeacherDocument, options);
      }
export function useFindTeacherLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindTeacherQuery, FindTeacherQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindTeacherQuery, FindTeacherQueryVariables>(FindTeacherDocument, options);
        }
export type FindTeacherQueryHookResult = ReturnType<typeof useFindTeacherQuery>;
export type FindTeacherLazyQueryHookResult = ReturnType<typeof useFindTeacherLazyQuery>;
export type FindTeacherQueryResult = Apollo.QueryResult<FindTeacherQuery, FindTeacherQueryVariables>;
export const FindUserDocument = gql`
    query FindUser($key: Int!) {
  findUser(key: $key) {
    id
    key
    email
    emailConfirmed
    isActive
    created
    role {
      title
    }
    profile {
      __typename
      ... on Teacher {
        id
        country
        firstName
        lastName
        phone {
          phone
          phoneCode
        }
        subscription {
          id
          status
          startDate
          endDate
          created
          renewCount
          memberShipOn {
            id
            title
            price
          }
        }
        dateOfBirth
        personalImage
      }
      ... on Student {
        id
        level
        country
        firstName
        lastName
        dateOfBirth
        letterImage
        personalImage
        birthCertImage
        teacher {
          id
          country
          firstName
          lastName
          personalImage
        }
      }
    }
  }
}
    `;

/**
 * __useFindUserQuery__
 *
 * To run a query within a React component, call `useFindUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserQuery({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useFindUserQuery(baseOptions: Apollo.QueryHookOptions<FindUserQuery, FindUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindUserQuery, FindUserQueryVariables>(FindUserDocument, options);
      }
export function useFindUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUserQuery, FindUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindUserQuery, FindUserQueryVariables>(FindUserDocument, options);
        }
export type FindUserQueryHookResult = ReturnType<typeof useFindUserQuery>;
export type FindUserLazyQueryHookResult = ReturnType<typeof useFindUserLazyQuery>;
export type FindUserQueryResult = Apollo.QueryResult<FindUserQuery, FindUserQueryVariables>;
export const GetAuthUserDocument = gql`
    query GetAuthUser {
  getAuthUser {
    id
    key
    email
    isActive
    emailConfirmed
    role {
      title
      permissions {
        title
      }
    }
    countAllNotifications
    countAllMessages
    messagesCount
    notificationsCount
    profile {
      __typename
      ... on Student {
        id
        firstName
        lastName
        level
        country
        personalImage
        birthCertImage
        letterImage
        dateOfBirth
        teacher {
          id
          firstName
          lastName
          userId
        }
      }
      ... on Teacher {
        id
        country
        firstName
        lastName
        dateOfBirth
        phone {
          phone
          phoneCode
        }
        personalImage
        subscription {
          id
          status
          startDate
          endDate
          created
          renewCount
          memberShipOn {
            id
            title
            price
          }
        }
      }
    }
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
export function useGetAuthUserQuery(baseOptions?: Apollo.QueryHookOptions<GetAuthUserQuery, GetAuthUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAuthUserQuery, GetAuthUserQueryVariables>(GetAuthUserDocument, options);
      }
export function useGetAuthUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAuthUserQuery, GetAuthUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAuthUserQuery, GetAuthUserQueryVariables>(GetAuthUserDocument, options);
        }
export type GetAuthUserQueryHookResult = ReturnType<typeof useGetAuthUserQuery>;
export type GetAuthUserLazyQueryHookResult = ReturnType<typeof useGetAuthUserLazyQuery>;
export type GetAuthUserQueryResult = Apollo.QueryResult<GetAuthUserQuery, GetAuthUserQueryVariables>;
export const PaginateUsersDocument = gql`
    query PaginateUsers($params: UserPaginationDto!) {
  paginateUsers(params: $params) {
    total
    data {
      id
      key
      role {
        title
      }
      isActive
      created
      emailConfirmed
      profile {
        __typename
        ... on Student {
          id
          firstName
          lastName
          level
          country
          personalImage
        }
        ... on Teacher {
          id
          firstName
          lastName
          country
          personalImage
        }
      }
    }
  }
}
    `;

/**
 * __usePaginateUsersQuery__
 *
 * To run a query within a React component, call `usePaginateUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaginateUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaginateUsersQuery({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function usePaginateUsersQuery(baseOptions: Apollo.QueryHookOptions<PaginateUsersQuery, PaginateUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaginateUsersQuery, PaginateUsersQueryVariables>(PaginateUsersDocument, options);
      }
export function usePaginateUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaginateUsersQuery, PaginateUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaginateUsersQuery, PaginateUsersQueryVariables>(PaginateUsersDocument, options);
        }
export type PaginateUsersQueryHookResult = ReturnType<typeof usePaginateUsersQuery>;
export type PaginateUsersLazyQueryHookResult = ReturnType<typeof usePaginateUsersLazyQuery>;
export type PaginateUsersQueryResult = Apollo.QueryResult<PaginateUsersQuery, PaginateUsersQueryVariables>;
export const SearchUsersDocument = gql`
    query SearchUsers($params: UserPaginationDto!) {
  searchUsers(params: $params) {
    __typename
    ... on Student {
      id
      firstName
      lastName
      userId
      personalImage
    }
    ... on Teacher {
      id
      firstName
      lastName
      userId
      personalImage
    }
  }
}
    `;

/**
 * __useSearchUsersQuery__
 *
 * To run a query within a React component, call `useSearchUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUsersQuery({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useSearchUsersQuery(baseOptions: Apollo.QueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, options);
      }
export function useSearchUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, options);
        }
export type SearchUsersQueryHookResult = ReturnType<typeof useSearchUsersQuery>;
export type SearchUsersLazyQueryHookResult = ReturnType<typeof useSearchUsersLazyQuery>;
export type SearchUsersQueryResult = Apollo.QueryResult<SearchUsersQuery, SearchUsersQueryVariables>;
export const TeacherDashboardDocument = gql`
    query TeacherDashboard($id: String!) {
  teacherDashboard(id: $id) {
    meTotal
    total
  }
}
    `;

/**
 * __useTeacherDashboardQuery__
 *
 * To run a query within a React component, call `useTeacherDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeacherDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeacherDashboardQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTeacherDashboardQuery(baseOptions: Apollo.QueryHookOptions<TeacherDashboardQuery, TeacherDashboardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeacherDashboardQuery, TeacherDashboardQueryVariables>(TeacherDashboardDocument, options);
      }
export function useTeacherDashboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeacherDashboardQuery, TeacherDashboardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeacherDashboardQuery, TeacherDashboardQueryVariables>(TeacherDashboardDocument, options);
        }
export type TeacherDashboardQueryHookResult = ReturnType<typeof useTeacherDashboardQuery>;
export type TeacherDashboardLazyQueryHookResult = ReturnType<typeof useTeacherDashboardLazyQuery>;
export type TeacherDashboardQueryResult = Apollo.QueryResult<TeacherDashboardQuery, TeacherDashboardQueryVariables>;