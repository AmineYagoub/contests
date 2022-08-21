import { proxy } from 'valtio';

import { Contest } from '@/graphql/graphql';
import { cloneDeep } from '@apollo/client/utilities';

interface ContestStorage {
  contest: Contest;
  contests: Contest[];
  queryLoading: boolean;
  mutationLoading: boolean;
}

const init: ContestStorage = {
  contest: null,
  contests: [],
  mutationLoading: false,
  queryLoading: false,
};

export const ContestState = proxy<ContestStorage>(init);

export const ContestActions = {
  setContest: (contest: Contest) => {
    ContestState.contest = contest;
  },
  setContestsData: (contests: Contest[]) => {
    ContestState.contests = contests;
  },
  setQueryLoading: (loading: boolean) => {
    ContestState.queryLoading = loading;
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
