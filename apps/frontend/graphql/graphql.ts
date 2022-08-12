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
  /** Identifies the author of the Contest. */
  authorId: Scalars['Int'];
  /** Identifies a list of countries that can be allowed to join this Contest. */
  countries?: Maybe<Array<Scalars['String']>>;
  /** Identifies the date and time when the object was created. */
  created: Scalars['DateTime'];
  /** Identifies the duration of the Contest. */
  duration: Scalars['Int'];
  id: Scalars['Int'];
  /** Identifies a list of levels that can be join this Contest. */
  level: Array<ContestLevel>;
  /** Identifies the max number of Participants in the Contest. */
  maxParticipants: Scalars['Int'];
  /** Identifies a list of users ids that joins this contest. */
  participants?: Maybe<Array<Scalars['String']>>;
  /** Identifies if the Contest is published or not. */
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

/** Contest Level */
export enum ContestLevel {
  Eighteen = 'Eighteen',
  Fifteen = 'Fifteen',
  Fourteen = 'Fourteen',
  Nineteen = 'Nineteen',
  Seventeen = 'Seventeen',
  Sixteen = 'Sixteen',
  Thirteen = 'Thirteen',
}

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
  level: Array<Scalars['String']>;
  maxParticipants?: InputMaybe<Scalars['Int']>;
  participants?: InputMaybe<Array<Scalars['Int']>>;
  published?: InputMaybe<Scalars['Boolean']>;
  questionCount?: InputMaybe<Scalars['Int']>;
  startTime: Scalars['DateTime'];
  status: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createContest: Contest;
  seedContest?: Maybe<Scalars['Boolean']>;
};

export type MutationCreateContestArgs = {
  input: CreateContestDto;
};

export type OrderType = {
  created?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['String']>;
  participants?: InputMaybe<Scalars['String']>;
  startTime?: InputMaybe<Scalars['String']>;
};

export type PaginateContest = {
  __typename?: 'PaginateContest';
  data?: Maybe<Array<Contest>>;
  total: Scalars['Int'];
};

export type PaginateContestDto = {
  orderBy?: InputMaybe<OrderType>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<WhereType>;
};

export type Query = {
  __typename?: 'Query';
  findOneContestById?: Maybe<Contest>;
  paginateContest?: Maybe<PaginateContest>;
};

export type QueryFindOneContestByIdArgs = {
  id: Scalars['Int'];
};

export type QueryPaginateContestArgs = {
  params: PaginateContestDto;
};

export type WhereType = {
  countries?: InputMaybe<Array<Scalars['String']>>;
  created?: InputMaybe<Array<Scalars['String']>>;
  duration?: InputMaybe<Scalars['Int']>;
  level?: InputMaybe<Array<Scalars['String']>>;
  participants?: InputMaybe<Array<Scalars['Int']>>;
  questionCount?: InputMaybe<Scalars['Int']>;
  startTime?: InputMaybe<Array<Scalars['String']>>;
  status?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type CreateContestMutationVariables = Exact<{
  input: CreateContestDto;
}>;

export type CreateContestMutation = {
  __typename?: 'Mutation';
  createContest: {
    __typename?: 'Contest';
    id: number;
    title: string;
    level: Array<ContestLevel>;
    status: ContestStatus;
    startTime: any;
    published: boolean;
    created: any;
    updated: any;
  };
};

export type PaginateContestsQueryVariables = Exact<{
  params: PaginateContestDto;
}>;

export type PaginateContestsQuery = {
  __typename?: 'Query';
  paginateContest?: {
    __typename?: 'PaginateContest';
    total: number;
    data?: Array<{
      __typename?: 'Contest';
      id: number;
      title: string;
      duration: number;
      published: boolean;
      level: Array<ContestLevel>;
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
  query PaginateContests($params: PaginateContestDto!) {
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
