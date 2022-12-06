import { proxy } from 'valtio';

import { User } from '@/graphql/graphql';
import { cloneDeep } from '@apollo/client/utilities';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

export type MessageContentType = {
  id: string;
  authorName: string;
  authorId: string;
  avatar: string;
  content: string;
  datetime: EmotionJSX.Element;
};

interface MessageStorage {
  currentContactId: string;
  contactLoading: boolean;
  contactList: User[];
  messages: MessageContentType[];
}

const init: MessageStorage = {
  currentContactId: null,
  contactLoading: false,
  contactList: [],
  messages: [],
};

export const MessageState = proxy<MessageStorage>(init);

export const MessageActions = {
  setCurrentContact: (id: string) => {
    MessageState.currentContactId = id;
  },
  setMessages: (messages: MessageContentType[]) => {
    MessageState.messages = messages;
  },
  setContactList: (users: User[]) => {
    MessageState.contactList = users;
  },
  setContactLoading: (val: boolean) => {
    MessageState.contactLoading = val;
  },
  addMessage: (message: MessageContentType) => {
    MessageState.messages.push(message);
  },
  deleteMessage: (id: string) => {
    MessageState.messages = MessageState.messages.filter((el) => el.id !== id);
  },
  resetState: () => {
    const resetObj = cloneDeep(init);
    Object.keys(resetObj).forEach((key) => {
      MessageState[key] = resetObj[key];
    });
  },
};
