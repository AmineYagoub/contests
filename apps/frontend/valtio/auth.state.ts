import { proxy } from 'valtio';

import { User } from '@/graphql/graphql';
import { cloneDeep } from '@apollo/client/utilities';

interface AuthStorage {
  user: User;
}

const init: AuthStorage = {
  user: null,
};

export const AuthState = proxy<AuthStorage>(init);

export const AuthActions = {
  setUser: (user: User) => {
    AuthState.user = user;
  },

  setUserAvatar: (url: string) => {
    if (AuthState.user) {
      AuthState.user.profile.personalImage = url;
    }
  },
  resetMessagesCounter: () => {
    AuthState.user.messagesCount = AuthState.user.countAllMessages;
  },
  resetNotificationsCounter: (val?: number) => {
    AuthState.user.notificationsCount =
      val || AuthState.user.countAllNotifications;
  },
  resetState: () => {
    const resetObj = cloneDeep(init);
    Object.keys(resetObj).forEach((key) => {
      AuthState[key] = resetObj[key];
    });
  },
};
