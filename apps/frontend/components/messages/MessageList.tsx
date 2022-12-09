import { ClockCircleOutlined } from '@ant-design/icons';
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef } from 'react';
import { List, Skeleton, Empty, Tooltip, Tag } from 'antd';
import { MessageContentType } from '@/valtio/message.state';
import styled from '@emotion/styled';
import Loading from '../common/Loading';
import moment from 'moment-timezone';
import Avatar from 'antd/lib/avatar/avatar';

export const messagesLimit = 10;

const StyledSection = styled('section')({
  height: 300,
  overflow: 'scroll',
  paddingLeft: 13,
});

const { Item } = List;

const StyledListItem = styled(Item)`
  display: flex;
  flex-direction: column;
  align-items: stretch !important;
  width: 90%;
  border-radius: 35px;
  padding: 20px 10px !important;
  margin: 5px 20px;
  text-align: justify;
  direction: ${(props) => (props.dir === 'left' ? 'ltr' : 'rtl')};
  float: ${(props) => (props.dir === 'left' ? 'left' : 'right')};
  background-color: ${(props) =>
    props.dir === 'left' ? '#efefef' : 'lightblue'};
`;

const MessagesList = ({
  messages,
  hasMore,
  loading,
  viewRef,
  id,
}: {
  messages: MessageContentType[];
  hasMore: boolean;
  loading: boolean;
  viewRef: (node?: Element) => void;
  id: string;
}) => {
  const [reference] = useInView();
  const scrollArea = useRef();
  const loadMoreArea = useRef();

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

  useEffect(() => {
    if (scrollArea.current) {
      (scrollArea.current as HTMLDivElement).scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <StyledSection ref={loadMoreArea}>
      <div
        ref={viewRef}
        style={{
          textAlign: 'center',
        }}
      >
        {hasMore ? <Skeleton avatar paragraph={{ rows: 1 }} active /> : null}
      </div>
      {messages?.length > 0 ? (
        <List
          bordered={false}
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={(item) => {
            const isMe = item.authorId === id;
            return (
              <StyledListItem dir={isMe ? 'left' : 'right'} key={item.id}>
                <Skeleton loading={loading} active avatar>
                  <Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<span ref={reference}>{item.authorName}</span>}
                    description={
                      <Tooltip
                        title={moment(item.datetime).format('h:mm:ss a')}
                      >
                        <Tag
                          color="green"
                          icon={
                            <ClockCircleOutlined style={{ color: 'green' }} />
                          }
                          style={{ borderRadius: 35 }}
                        >
                          {moment(item.datetime).format('Do MMMM YYYY')}
                        </Tag>
                      </Tooltip>
                    }
                  />
                  <b
                    ref={scrollArea}
                    style={{
                      padding: 15,
                      whiteSpace: 'pre-wrap',
                      textAlign: 'right',
                    }}
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  ></b>
                </Skeleton>
              </StyledListItem>
            );
          }}
        />
      ) : loading ? (
        <Loading />
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
