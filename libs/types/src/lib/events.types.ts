export const USER_CREATED_EVENT = 'user.created';
export const USER_CHANGE_PASSWORD = 'user.updated.pwd';

export type UserMutatedEvent = {
  token: string;
  email: string;
  template: string;
  id: string;
};
