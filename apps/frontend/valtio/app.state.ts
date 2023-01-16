import { proxy } from 'valtio';
import { cloneDeep } from '@apollo/client/utilities';

interface AppStorage {
  sidebarCollapsed: boolean;
}

const init: AppStorage = {
  sidebarCollapsed: true,
};

export const AppState = proxy<AppStorage>(init);

export const AppActions = {
  toggleSidebarCollapsed: () => {
    AppState.sidebarCollapsed = !AppState.sidebarCollapsed;
  },

  resetState: () => {
    const resetObj = cloneDeep(init);
    Object.keys(resetObj).forEach((key) => {
      AppState[key] = resetObj[key];
    });
  },
};
