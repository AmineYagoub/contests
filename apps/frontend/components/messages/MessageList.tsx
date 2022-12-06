import { DeleteOutlined } from '@ant-design/icons';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';
import { Comment, List, Skeleton, Empty, Button } from 'antd';
import { useDeleteMessageMutation } from '@/graphql/graphql';
import { Logger } from '@/utils/app';
import { MessageActions, MessageContentType } from '@/valtio/message.state';
import styled from '@emotion/styled';

export const messagesLimit = 10;

const StyledSection = styled('section')({
  height: 300,
  overflow: 'scroll',
  paddingLeft: 13,
});

const StyledComment = styled(Comment)`
  borderRadius: 35,
  padding: '0 20px',
  margin: '10px 0',
  width: '90%',
  direction: ${(props) => (props.prefixCls === 'left' ? 'ltr' : 'rtl')},
  float: ${(props) => (props.prefixCls === 'left' ? 'left' : 'right')},
  backgroundColor: ${(props) => (props.prefixCls === 'left' ? '#efefef' : '')},
`;

const MessagesList = ({
  messages,
  hasMore,
  loading,
}: {
  messages: MessageContentType[];
  hasMore: boolean;
  loading: boolean;
}) => {
  const [ref, inView] = useInView();
  const [reference] = useInView();
  const scrollArea = useRef();
  const loadMoreArea = useRef();

  const [DeleteMessageMutation] = useDeleteMessageMutation();

  const deleteMessage = async (id: string) => {
    try {
      const { data } = await DeleteMessageMutation({
        variables: {
          id,
        },
      });
      if (data?.deleteMessage) {
        MessageActions.deleteMessage(id);
      }
    } catch (error) {
      Logger.log(error);
    }
  };

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

  /*   useEffect(() => {
    if (selectedContact) {
      refetch()
        .then(({ data }) => {
          updateUnviewedMessages(data);
        })
        .finally(() => {
          setTimeout(() => {
            const el = loadMoreArea.current as HTMLDivElement;
            el?.scrollBy({
              top: el.scrollHeight,
              left: 0,
            });
          }, 0);
        });
    }
  }, [selectedContact]); */

  /*   useEffect(() => {
    socket.on('onMessageCreated', ({ data }) => {
      if (data.owner._id === selectedContactVar()) {
        messsagesVar([...messsagesVar(), getMessage(data as Message)]);
        messsageAddedVar(messsageAddedVar() + 1);

        UpdateMessageStatMutation({
          variables: {
            input: {
              meIds: [data._id],
              viewed: true,
              allIds: [],
              viewer: '',
            },
          },
        });
      }
    });
  }, []); */

  /*   useEffect(() => {
    if (scrollArea.current) {
      (scrollArea.current as HTMLDivElement).scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [messageAdded]); */

  return (
    <StyledSection ref={loadMoreArea}>
      <div
        ref={ref}
        style={{
          textAlign: 'center',
        }}
      >
        {hasMore ? <Skeleton avatar paragraph={{ rows: 1 }} active /> : null}
      </div>
      {messages?.length > 0 ? (
        <List
          bordered={false}
          loading={loading}
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={(item) => {
            const isMe = item.authorId !== 'meId';

            return (
              <StyledComment
                prefixCls={isMe ? 'left' : 'right'}
                actions={[
                  !isMe && (
                    <Button
                      type="link"
                      icon={<DeleteOutlined style={{ color: '#e400dd' }} />}
                      onClick={() => deleteMessage(item.id)}
                    >
                      حذف
                    </Button>
                  ),
                ]}
                author={<span ref={reference}>{item.authorName}</span>}
                avatar={item.avatar}
                content={
                  <div
                    ref={scrollArea}
                    style={{ direction: 'rtl', whiteSpace: 'pre-wrap' }}
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  ></div>
                }
                datetime={item.datetime}
              />
            );
          }}
        />
      ) : (
        <Empty
          imageStyle={{
            height: 160,
            marginTop: 40,
          }}
          description={<span>لا يوجد رسائل واردة</span>}
        />
      )}
    </StyledSection>
  );
};

export default MessagesList;
