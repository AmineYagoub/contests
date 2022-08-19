import { proxy } from 'valtio';

import { CreateQuestionDto, Question } from '@/graphql/graphql';
import { cloneDeep } from '@apollo/client/utilities';

interface QuestionStorage {
  question?: Question;
  questions?: Question[];
  createManyProgression?: number;
  createManyRecords?: CreateQuestionDto[];
  createManyRecordsFail?: CreateQuestionDto[];
}

const init: QuestionStorage = {
  question: null,
  questions: [],
  createManyProgression: 0,
  createManyRecords: [],
  createManyRecordsFail: [],
};

export const QuestionState = proxy<QuestionStorage>(init);

export const QuestionActions = {
  incProgress: (progress: number) => {
    QuestionState.createManyProgression = progress;
  },
  setQuestion: (question: Question) => {
    QuestionState.question = question;
  },
  addToCreateManyRecords: (question: CreateQuestionDto) => {
    QuestionState.createManyRecords.push(question);
  },
  addToCreateManyRecordsFail: (question: CreateQuestionDto) => {
    QuestionState.createManyRecordsFail.push(question);
  },

  resetState: () => {
    const resetObj = cloneDeep(init);
    Object.keys(resetObj).forEach((key) => {
      QuestionState[key] = resetObj[key];
    });
  },
};
