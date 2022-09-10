import { proxy } from 'valtio';

import { Contest, SelectedAnswerInput } from '@/graphql/graphql';
import { cloneDeep } from '@apollo/client/utilities';

interface ContestStorage {
  contest: Contest;
  contests: Contest[];
  answers: SelectedAnswerInput[];
  queryLoading: boolean;
  contestStarted: boolean;
  contestFinished: boolean;
  contestSubmitted: boolean;
  contestAnnulled: boolean;
  mutationLoading: boolean;
  contestTimeCounter: number;
  contestCurrentIndex: number;
}

const init: ContestStorage = {
  contest: null,
  contests: [],
  answers: [],
  queryLoading: false,
  contestStarted: false,
  contestTimeCounter: 0,
  contestCurrentIndex: 0,
  contestFinished: false,
  contestSubmitted: false,
  contestAnnulled: false,
  mutationLoading: false,
};

export const ContestState = proxy<ContestStorage>(init);

// TODO Handle contest annulled
// TODO Handle submitted
// TODO Handle contest offline
// TODO Handle show contest Result

// TODO Handle Send contest Result by email
// TODO Handle Send contest Result by notification to admin
const deadline = (target: number) => Date.now() + 1000 * 60 * target + 1000;

export const ContestActions = {
  setContest: (contest: Contest) => {
    ContestState.contest = contest;
  },
  setContestsData: (contests: Contest[]) => {
    ContestState.contests = contests;
  },
  setAnswer: (
    optionIndex: number,
    questionId: string,
    option: string,
    options: string[]
  ) => {
    const find = ContestState.answers.findIndex(
      (el) => el.questionId === questionId
    );
    if (find === -1) {
      ContestState.answers.push({
        questionIndex: ContestState.contestCurrentIndex,
        optionIndex,
        questionId,
        option,
        options,
      });
    } else {
      ContestState.answers[find].optionIndex = optionIndex;
    }
    if (ContestState.answers.length === ContestState.contest.questions.length) {
      ContestState.contestFinished = true;
      ContestState.contestStarted = false;
    }
  },
  setQueryLoading: (loading: boolean) => {
    ContestState.queryLoading = loading;
  },

  setContestStarted: (value: boolean) => {
    if (value) {
      ContestState.contestTimeCounter = deadline(
        ContestState?.contest?.duration
      );
    }
    ContestState.contestStarted = value;
  },
  setContestFinished: (value: boolean) => {
    ContestState.contestFinished = value;
  },
  setContestSubmitted: (value: boolean) => {
    ContestState.contestSubmitted = value;
  },
  setContestAnnulled: () => {
    if (ContestState.contestStarted) {
      ContestState.contestStarted = false;
      ContestState.contestFinished = false;
      ContestState.contestAnnulled = true;
    }
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
