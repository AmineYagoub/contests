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

export type Contest = {
  __typename?: 'Contest';
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
  maxParticipants: Scalars['Int'];
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
  /** Identifies a list of tags that belongs to this Question. */
  tags: Array<Tag>;
  /** Identifies the title of the Contest. */
  title: Scalars['String'];
  /** Identifies the Type of this Contest. */
  type: ContestType;
  /** Identifies the date and time when the object was last updated. */
  updated: Scalars['DateTime'];
};

export type ContestPaginationDto = {
  includeQuestions?: InputMaybe<Scalars['Boolean']>;
  orderBy?: InputMaybe<OrderContestArgs>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<WhereContestArgs>;
};

export type ContestPaginationResponce = {
  __typename?: 'ContestPaginationResponce';
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
  level: Array<StudentLevel>;
  options: Array<Scalars['String']>;
  published?: InputMaybe<Scalars['Boolean']>;
  tags: TagConnectInput;
  title: Scalars['String'];
  type: QuestionType;
};

export type Mutation = {
  __typename?: 'Mutation';
  createContest: Contest;
  createQuestion: Question;
  createTag: Tag;
  deleteContestById?: Maybe<Contest>;
  deleteQuestionById?: Maybe<Question>;
  deleteTagById?: Maybe<Tag>;
  updateContest: Contest;
  updateQuestion: Question;
  updateTag: Tag;
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

export type MutationDeleteContestByIdArgs = {
  id: Scalars['String'];
};

export type MutationDeleteQuestionByIdArgs = {
  id: Scalars['String'];
};

export type MutationDeleteTagByIdArgs = {
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

export type Query = {
  __typename?: 'Query';
  findOneContestById?: Maybe<Contest>;
  findOneQuestionById?: Maybe<Question>;
  findOneTagById?: Maybe<Tag>;
  findTags?: Maybe<Array<Tag>>;
  paginateContest?: Maybe<ContestPaginationResponce>;
  paginateQuestions?: Maybe<QuestionPaginationResponce>;
};

export type QueryFindOneContestByIdArgs = {
  id: Scalars['String'];
  isExam?: InputMaybe<Scalars['Boolean']>;
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
  /** Identifies a list of levels that can be join this Contest. */
  level: Array<StudentLevel>;
  /** Identifies a list of ansewers of this Question. */
  options: Array<Scalars['String']>;
  /** Identifies if the Question is published or not. */
  published: Scalars['Boolean'];
  /** Identifies a list of tags that belongs to this Question. */
  tags: Array<Tag>;
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

export type QuestionPaginationResponce = {
  __typename?: 'QuestionPaginationResponce';
  data?: Maybe<Array<Question>>;
  total: Scalars['Int'];
};

/** Question Type */
export enum QuestionType {
  Easy = 'EASY',
  Hard = 'HARD',
  Medium = 'MEDIUM',
}

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
  level?: InputMaybe<Array<StudentLevel>>;
  options?: InputMaybe<Array<Scalars['String']>>;
  published?: InputMaybe<Scalars['Boolean']>;
  tags?: InputMaybe<TagConnectInput>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<QuestionType>;
  usedCount?: InputMaybe<Scalars['Int']>;
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
  level?: InputMaybe<Array<StudentLevel>>;
  options?: InputMaybe<Array<Scalars['String']>>;
  tags?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<QuestionType>;
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
  isExam?: InputMaybe<Scalars['Boolean']>;
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
    maxParticipants: number;
    tags: Array<{ __typename?: 'Tag'; title: string }>;
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
  isExam?: InputMaybe<Scalars['Boolean']>;
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
    maxParticipants: number;
    tags: Array<{ __typename?: 'Tag'; title: string }>;
    questions?: Array<{
      __typename?: 'Question';
      id: string;
      options: Array<string>;
      type: QuestionType;
      correctAnswer?: string | null;
      usedCount?: number | null;
      level: Array<StudentLevel>;
      lesson: string;
      tags: Array<{ __typename?: 'Tag'; title: string }>;
    }> | null;
  } | null;
};

export type PaginateContestsQueryVariables = Exact<{
  params: ContestPaginationDto;
}>;

export type PaginateContestsQuery = {
  __typename?: 'Query';
  paginateContest?: {
    __typename?: 'ContestPaginationResponce';
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
      maxParticipants: number;
      tags: Array<{ __typename?: 'Tag'; title: string }>;
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
    level: Array<StudentLevel>;
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
    level: Array<StudentLevel>;
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
    __typename?: 'QuestionPaginationResponce';
    total: number;
    data?: Array<{
      __typename?: 'Question';
      id: string;
      title: string;
      type: QuestionType;
      options: Array<string>;
      lesson: string;
      correctAnswer?: string | null;
      level: Array<StudentLevel>;
      created: any;
      updated: any;
      authorId: number;
      usedCount?: number | null;
      tags: Array<{ __typename?: 'Tag'; title: string }>;
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
  query FindByIdForExam($id: String!, $isExam: Boolean) {
    findOneContestById(id: $id, isExam: $isExam) {
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
 *      isExam: // value for 'isExam'
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
  query FindByIdForReview($id: String!, $isExam: Boolean) {
    findOneContestById(id: $id, isExam: $isExam) {
      id
      type
      tags {
        title
      }
      questions {
        id
        options
        type
        tags {
          title
        }
        correctAnswer
        usedCount
        level
        lesson
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
 *      isExam: // value for 'isExam'
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
      level
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
      level
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
        level
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
