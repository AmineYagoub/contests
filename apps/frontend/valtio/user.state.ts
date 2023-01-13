import { proxy } from 'valtio';

import { User } from '@/graphql/graphql';
import { cloneDeep } from '@apollo/client/utilities';

export type PhoneType = {
  phone: string;
  flag: string;
};

interface UsersStorage {
  user: User;
  users: User[];
  totalUsers: number;
  phoneCode?: PhoneType;
  queryLoading: boolean;
  mutationLoading: boolean;
}

const init: UsersStorage = {
  user: null,
  users: [],
  totalUsers: 0,
  phoneCode: null,
  mutationLoading: false,
  queryLoading: false,
};

export const UsersState = proxy<UsersStorage>(init);

export const UsersActions = {
  setUser: (user: User) => {
    UsersState.user = user;
  },
  setUsersData: (users: User[]) => {
    UsersState.users = users;
  },
  setTotalUsers: (val: number) => {
    UsersState.totalUsers = val;
  },
  setPhoneCode: (val: PhoneType) => {
    UsersState.phoneCode = val;
  },
  setQueryLoading: (loading: boolean) => {
    UsersState.queryLoading = loading;
  },
  setMutationLoading: (loading: boolean) => {
    UsersState.mutationLoading = loading;
  },
  resetState: () => {
    const resetObj = cloneDeep(init);
    Object.keys(resetObj).forEach((key) => {
      UsersState[key] = resetObj[key];
    });
  },
};
