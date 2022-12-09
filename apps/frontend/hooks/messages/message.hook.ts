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
  const messageSnap = useSnapshot(MessageState);
  const [hasMore, setHasMore] = useState(false);
  const [dataLength, setDataLength] = useState(0);
  const [createMessageMutation, { loading: submitLoading }] =
    useCreateMessageMutation();
  //const socket = useReactiveVar(socketVar);

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
      const msg = data.paginateMessages?.data
        ?.map((el) => getMessage(el as Message))
        .reverse();
      MessageActions.setMessages(msg);
    }
  }, [data]);

  /*   useEffect(() => {
    if (inView && messages?.length > 0 && messages?.length < dataLength) {
      fetchMore({
        variables: {
          args: getPaginationArgs(messages?.length),
        },
      }).then(({ data }) => {
        if (loadMoreArea.current) {
          (loadMoreArea.current as HTMLDivElement).scrollBy({
            top: 500,
            left: 0,
          });
        }
        setHasMore(data.paginateMesssages.hasNextPage);
        messsagesVar([...getMessages(data), ...messages]);
      });
    }
  }, [inView]); */

  return {
    hasMore,
    loading,
    submitLoading,
    handleMessageSubmit,
    form,
    ref,
  };
};
