import { proxy } from 'valtio';

import { Question } from '@/graphql/graphql';
import { cloneDeep } from '@apollo/client/utilities';

interface QuestionStorage {
  question: Question;
  questions: Question[];
  queryLoading: boolean;
  mutationLoading: boolean;
  importProgress?: number;
  importItemsFails: string[];
}

const init: QuestionStorage = {
  question: null,
  questions: [],
  mutationLoading: false,
  queryLoading: false,
  importProgress: 0,
  importItemsFails: [],
};

export const QuestionState = proxy<QuestionStorage>(init);

export const QuestionActions = {
  setImportProgress: (progress: number) => {
    QuestionState.importProgress = progress;
  },
  setQuestion: (question: Question) => {
    QuestionState.question = question;
  },
  setQuestionsData: (questions: Question[]) => {
    QuestionState.questions = questions;
  },
  setQueryLoading: (loading: boolean) => {
    QuestionState.queryLoading = loading;
  },
  setMutationLoading: (loading: boolean) => {
    QuestionState.mutationLoading = loading;
  },
  setImportItemsFails: (title: string) => {
    QuestionState.importItemsFails.push(title);
  },

  resetState: () => {
    const resetObj = cloneDeep(init);
    Object.keys(resetObj).forEach((key) => {
      QuestionState[key] = resetObj[key];
    });
  },
};
