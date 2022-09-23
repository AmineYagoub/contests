export const USER_CREATED_EVENT = 'user.created';

export type UserCreatedEvent = {
  token: string;
  email: string;
  template: string;
  query: string;
};
