import { Teacher, MessageType, Message } from '@/graphql/graphql';
import { List, Comment, Divider, Space, Button } from 'antd';

import moment from 'moment-timezone';
import ViewUserPopover from '@/components/messages/ViewUserPopover';
import DeleteMessage from '@/components/messages/DeleteMessage';
import AcceptStudent from '@/components/messages/AcceptStudent';
import HtmlContent from '@/components/common/HtmlContent';

const NotificationList = ({
  onLoadMore,
  loading,
  hasMore,
  data,
  onSuccess,
}: {
  onLoadMore: () => void;
  onSuccess: () => void;
  loading: boolean;
  hasMore: boolean;
  data: Message[];
}) => {
  const loadMore =
    !loading && hasMore ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>تحميل أكثر</Button>
      </div>
    ) : null;

  return (
    <List
      loading={loading}
      itemLayout="horizontal"
      dataSource={data}
      loadMore={loadMore}
      renderItem={(item) => (
        <>
          <Comment
            actions={
              item.type === MessageType.Request && [
                <Space key={item.id}>
                  <AcceptStudent
                    id={item.recipientId.id}
                    studentId={item.authorId.id}
                    messageId={item.id}
                    onSuccess={onSuccess}
                  />
                  <DeleteMessage id={item.id} onSuccess={onSuccess} />
                </Space>,
              ]
            }
            author={
              <ViewUserPopover
                profile={item.authorId.profile as Teacher}
                role={item.authorId.role?.title}
              />
            }
            avatar={item.authorId.profile.personalImage}
            datetime={moment(item.created).calendar()}
            content={<HtmlContent html={item.content} type={item.type} />}
          />
          <div
            style={{
              width: '75%',
              margin: '0 auto',
            }}
          >
            <Divider />
          </div>
        </>
      )}
    />
  );
};

export default NotificationList;
