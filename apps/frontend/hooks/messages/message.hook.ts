import {
  Message,
  MessageType,
  useCreateMessageMutation,
  usePaginateMessagesQuery,
} from '@/graphql/graphql';
import { Logger } from '@/utils/app';
import {
  MessageActions,
  MessageContentType,
  MessageState,
} from '@/valtio/message.state';
import { Form } from 'antd';
import DOMPurify from 'isomorphic-dompurify';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSnapshot } from 'valtio';

const getMessage = (message: Message): MessageContentType => {
  const profile = message.authorId.profile;
  return {
    id: message.id,
    authorName: `${profile.firstName} ${profile.lastName}`,
    authorId: message.authorId.id,
    avatar: profile.personalImage,
    content: DOMPurify.sanitize(message.content),
    datetime: message.created,
  };
};

export const useMessages = (id: string) => {
  const [form] = Form.useForm();
  const [ref, inView] = useInView();
  const loadMoreArea = useRef();
  const scrollArea = useRef();
  const messageSnap = useSnapshot(MessageState);
  const [hasMore, setHasMore] = useState(false);
  const [createMessageMutation, { loading: submitLoading }] =
    useCreateMessageMutation();
  //const socket = useReactiveVar(socketVar);

  const getPaginationParams = (skip = 0) => ({
    skip,
    take: 5,
    where: {
      recipientId: id,
      authorId: messageSnap.currentContactId,
    },
  });

  const handleMessageSubmit = async () => {
    const content = form.getFieldValue('content');
    if (content && messageSnap.currentContactId) {
      try {
        const { data } = await createMessageMutation({
          variables: {
            input: {
              content,
              authorId: id,
              recipientId: messageSnap.currentContactId,
              type: MessageType.Message,
            },
          },
        });
        if (data) {
          form.resetFields();
          MessageActions.addMessage(getMessage(data.createMessage as Message));
        }
      } catch (error) {
        Logger.log(error);
      }
    }
  };

  const { data, loading, fetchMore } = usePaginateMessagesQuery({
    variables: {
      params: getPaginationParams(),
    },
    skip: !messageSnap.currentContactId,
  });

  useEffect(() => {
    if (data) {
      const msg = data.paginateMessages?.data
        ?.map((el) => getMessage(el as Message))
        .reverse();
      MessageActions.setMessages(msg);
      setHasMore(messageSnap.messages.length < data.paginateMessages.total);
    }
  }, [data]);

  useEffect(() => {
    const messages = messageSnap.messages;
    if (inView && messages?.length > 0 && hasMore) {
      fetchMore({
        variables: {
          params: getPaginationParams(messages.length),
        },
      }).then(({ data }) => {
        if (loadMoreArea.current) {
          (loadMoreArea.current as HTMLDivElement).scrollBy({
            top: 500,
            left: 0,
          });
        }
        const msg = data.paginateMessages?.data
          ?.map((el) => getMessage(el as Message))
          .reverse();
        MessageActions.setMessages([...msg, ...messages]);
        setHasMore(messageSnap.messages.length < data.paginateMessages.total);
      });
    }
  }, [inView]);

  useEffect(() => {
    if (scrollArea.current) {
      (scrollArea.current as HTMLDivElement).scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [messageSnap.messageAdded]);

  return {
    hasMore,
    loading,
    submitLoading,
    handleMessageSubmit,
    scrollArea,
    loadMoreArea,
    form,
    ref,
  };
};
