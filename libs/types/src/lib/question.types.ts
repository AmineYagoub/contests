import { registerEnumType } from '@nestjs/graphql';

export enum QuestionType {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
  DICTATION = 'DICTATION',
}

export enum DictationQuestionLevel {
  FOURTH_AND_FIFTH = 'FOURTH_AND_FIFTH',
  GRAD_SIX = 'GRAD_SIX',
  FIRST_PREPARATORY = 'FIRST_PREPARATORY',
  SECOND_PREPARATORY = 'SECOND_PREPARATORY',
  THIRD_PREPARATORY = 'THIRD_PREPARATORY',
  FIRST_SECONDARY = 'FIRST_SECONDARY',
  SECOND_SECONDARY = 'SECOND_SECONDARY',
  THIRD_SECONDARY = 'THIRD_SECONDARY',
  EMPTY = 'EMPTY',
}

registerEnumType(QuestionType, {
  name: 'QuestionType',
  description: 'Question Type',
});

registerEnumType(DictationQuestionLevel, {
  name: 'DictationQuestionLevel',
  description: 'Dictation Question Level',
});

export type SelectedQuestionFields = {
  id: string;
  type?: string;
};
