import { QuestionType } from '@/graphql/graphql';

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
  type: QuestionType;
};

export type GaugeValues = {
  [QuestionType.Easy]: number;
  [QuestionType.Medium]: number;
  [QuestionType.Hard]: number;
};
