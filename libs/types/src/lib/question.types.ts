import { registerEnumType } from '@nestjs/graphql';

export enum QuestionType {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

registerEnumType(QuestionType, {
  name: 'QuestionType',
  description: 'Question Type',
});

export type SelectedQuestionFields = {
  id: string;
  type?: string;
};
