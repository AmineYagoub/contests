import { proxy } from 'valtio';

import { Contest } from '@/graphql/graphql';
import { cloneDeep } from '@apollo/client/utilities';

type AnswerType = {
  questionIndex: number;
  optionIndex: number;
  option: string;
};

interface ContestStorage {
  contest: Contest;
  contests: Contest[];
  answers: AnswerType[];
  queryLoading: boolean;
  contestStarted: boolean;
  contestFinished: boolean;
  contestSubmitted: boolean;
  contestAnnulled: boolean;
  mutationLoading: boolean;
  contestCurrentIndex: number;
}

const init: ContestStorage = {
  contest: null,
  contests: [],
  answers: [],
  queryLoading: false,
  contestStarted: false,
  contestCurrentIndex: 0,
  contestFinished: false,
  contestSubmitted: false,
  contestAnnulled: false,
  mutationLoading: false,
};

export const ContestState = proxy<ContestStorage>(init);

export const ContestActions = {
  setContest: (contest: Contest) => {
    ContestState.contest = contest;
  },
  setContestsData: (contests: Contest[]) => {
    ContestState.contests = contests;
  },
  setAnswer: (optionIndex: number, option: string) => {
    ContestState.answers.push({
      questionIndex: ContestState.contestCurrentIndex,
      optionIndex,
      option,
    });
  },
  setQueryLoading: (loading: boolean) => {
    ContestState.queryLoading = loading;
  },
  setContestStarted: (value: boolean) => {
    ContestState.contestStarted = value;
  },
  setContestFinished: (value: boolean) => {
    ContestState.contestFinished = value;
  },
  setContestSubmitted: (value: boolean) => {
    ContestState.contestSubmitted = value;
  },
  setContestAnnulled: (value: boolean) => {
    ContestState.contestAnnulled = value;
  },
  incrementQuestionIndex: () => {
    ContestState.contestCurrentIndex++;
  },
  decrementQuestionIndex: () => {
    ContestState.contestCurrentIndex--;
  },
  setMutationLoading: (loading: boolean) => {
    ContestState.mutationLoading = loading;
  },

  resetState: () => {
    const resetObj = cloneDeep(init);
    Object.keys(resetObj).forEach((key) => {
      ContestState[key] = resetObj[key];
    });
  },
};
