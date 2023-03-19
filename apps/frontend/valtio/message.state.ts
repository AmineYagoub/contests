import { proxy } from 'valtio';

import { Message, User } from '@/graphql/graphql';
import { cloneDeep } from '@apollo/client/utilities';

export type MessageContentType = {
  id: string;
  authorName: string;
  authorId: string;
  avatar: string;
  content: string;
  datetime: string;
};

interface MessageStorage {
  currentContactId: string;
  contactLoading: boolean;
  notificationsLoading: boolean;
  contactList: User[];
  messages: MessageContentType[];
  notifications: Message[];
  messageAdded: number;
}

const init: MessageStorage = {
  currentContactId: null,
  contactLoading: false,
  contactList: [],
  messages: [],
  notifications: [],
  notificationsLoading: false,
  messageAdded: 0,
};

export const MessageState = proxy<MessageStorage>(init);

export const MessageActions = {
  setCurrentContact: (id: string) => {
    MessageState.currentContactId = id;
  },
  setMessages: (messages: MessageContentType[]) => {
    MessageState.messages = messages;
  },
  setNotifications: (notifications: Message[]) => {
    MessageState.notifications = notifications;
  },
  setNotificationsLoading: (val: boolean) => {
    MessageState.notificationsLoading = val;
  },
  setContactList: (users: User[]) => {
    MessageState.contactList = users;
  },
  addToContactList: (user: User) => {
    if (!MessageState.contactList.find((el) => el.id === user.id)) {
      MessageState.contactList.unshift(user);
    }
  },
  setContactLoading: (val: boolean) => {
    MessageState.contactLoading = val;
  },
  addMessage: (message: MessageContentType) => {
    MessageState.messageAdded += 1;
    MessageState.messages.push(message);
  },
  deleteMessage: (id: string) => {
    MessageState.messages = MessageState.messages.filter((el) => el.id !== id);
  },
  incrementMessage: () => {
    MessageState.messageAdded += 1;
  },
  resetState: () => {
    const resetObj = cloneDeep(init);
    Object.keys(resetObj).forEach((key) => {
      MessageState[key] = resetObj[key];
    });
  },
};
