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
  id: Scalars['ID'];
  /** Identifies a list of levels that can be join this Contest. */
  level: Array<StudentLevel>;
  /** Identifies the max number of Participants in the Contest. */
  maxParticipants: Scalars['Int'];
  /** Identifies a list of users ids that joins this contest. */
  participants?: Maybe<Array<Scalars['String']>>;
  /** Identifies if the Question is published or not. */
  published: Scalars['Boolean'];
  /** Identifies how many questions in the Contest. */
  questionCount: Scalars['Int'];
  /** Identifies the date and time when contest started. */
  startTime: Scalars['DateTime'];
  /** Identifies the status of the Contest. */
  status: ContestStatus;
  /** Identifies the title of the Contest. */
  title: Scalars['String'];
  /** Identifies the Type of this Contest. */
  type: ContestType;
  /** Identifies the date and time when the object was last updated. */
  updated: Scalars['DateTime'];
};

export type ContestPaginationDto = {
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
  level: Array<StudentLevel>;
  maxParticipants?: InputMaybe<Scalars['Int']>;
  participants?: InputMaybe<Array<Scalars['Int']>>;
  published?: InputMaybe<Scalars['Boolean']>;
  questionCount?: InputMaybe<Scalars['Int']>;
  startTime: Scalars['DateTime'];
  status: ContestStatus;
  title: Scalars['String'];
  type: ContestType;
};

export type CreateQuestionDto = {
  authorId: Scalars['Int'];
  level: Array<StudentLevel>;
  options: Array<Scalars['String']>;
  published?: InputMaybe<Scalars['Boolean']>;
  title: Scalars['String'];
  type: QuestionType;
};

export type Mutation = {
  __typename?: 'Mutation';
  createContest: Contest;
  createQuestion: Question;
  seedContest?: Maybe<Scalars['Boolean']>;
};

export type MutationCreateContestArgs = {
  input: CreateContestDto;
};

export type MutationCreateQuestionArgs = {
  input: CreateQuestionDto;
};

export type OrderByOptionsArgs = {
  count?: InputMaybe<OrderByType>;
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
  options?: InputMaybe<OrderByOptionsArgs>;
  usedCount?: InputMaybe<OrderByType>;
};

export type Query = {
  __typename?: 'Query';
  findOneContestById?: Maybe<Contest>;
  findOneQuestionById?: Maybe<Question>;
  paginateContest?: Maybe<ContestPaginationResponce>;
  paginateQuestions?: Maybe<QuestionPaginationResponce>;
};

export type QueryFindOneContestByIdArgs = {
  id: Scalars['Int'];
};

export type QueryFindOneQuestionByIdArgs = {
  id: Scalars['Int'];
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
  /** Identifies the date and time when the object was created. */
  created: Scalars['DateTime'];
  id: Scalars['ID'];
  /** Identifies a list of levels that can be join this Contest. */
  level: Array<StudentLevel>;
  /** Identifies a list of ansewers of this Question. */
  options: Array<Scalars['String']>;
  /** Identifies if the Question is published or not. */
  published: Scalars['Boolean'];
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

export type WhereContestArgs = {
  countries?: InputMaybe<Array<Scalars['String']>>;
  created?: InputMaybe<Array<Scalars['String']>>;
  duration?: InputMaybe<Scalars['Int']>;
  level?: InputMaybe<Array<StudentLevel>>;
  participants?: InputMaybe<Array<Scalars['Int']>>;
  questionCount?: InputMaybe<Scalars['Int']>;
  startTime?: InputMaybe<Array<Scalars['String']>>;
  status?: InputMaybe<ContestStatus>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<ContestType>;
};

export type WhereQuestionArgs = {
  created?: InputMaybe<Array<Scalars['String']>>;
  level?: InputMaybe<Array<StudentLevel>>;
  options?: InputMaybe<Array<Scalars['String']>>;
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
      title: string;
      duration: number;
      published: boolean;
      level: Array<StudentLevel>;
      created: any;
      updated: any;
      status: ContestStatus;
      authorId: number;
      startTime: any;
      questionCount: number;
      participants?: Array<string> | null;
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
      published: boolean;
      level: Array<StudentLevel>;
      created: any;
      updated: any;
      authorId: number;
      usedCount?: number | null;
    }> | null;
  } | null;
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
export const PaginateContestsDocument = gql`
  query PaginateContests($params: ContestPaginationDto!) {
    paginateContest(params: $params) {
      total
      data {
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
        questionCount
        participants
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
export const PaginateQuestionsDocument = gql`
  query PaginateQuestions($params: QuestionPaginationDto!) {
    paginateQuestions(params: $params) {
      total
      data {
        id
        title
        type
        options
        published
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
