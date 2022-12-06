import {
  Message,
  PaginateMessagesQuery,
  usePaginateMessagesQuery,
} from '@/graphql/graphql';
import {
  MessageActions,
  MessageContentType,
  MessageState,
} from '@/valtio/message.state';
import DOMPurify from 'isomorphic-dompurify';
import { FC, ReactElement, useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';

export const useMessages = (
  id: string,
  getMessage: (message: Message) => MessageContentType
) => {
  const messageSnap = useSnapshot(MessageState);
  const [hasMore, setHasMore] = useState(false);
  const [dataLength, setDataLength] = useState(0);

  const { data, loading, refetch, fetchMore } = usePaginateMessagesQuery({
    variables: {
      params: {
        where: {
          recipientId: id,
          authorId: messageSnap.currentContactId,
        },
      },
    },
    skip: !messageSnap.currentContactId,
  });

  useEffect(() => {
    if (data) {
      setDataLength(data.paginateMessages.total);
      const msg = data.paginateMessages?.data?.map((el: Message) =>
        getMessage(el)
      );
      MessageActions.setMessages(msg?.reverse());
    }
  }, [data, getMessage]);

  return { hasMore, loading };
};
