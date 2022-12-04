import {
  MessageType,
  Student,
  Teacher,
  usePaginateNotificationsQuery,
} from '@/graphql/graphql';
import { List, Empty, Comment, Divider, Space } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import DOMPurify from 'isomorphic-dompurify';
import moment from 'moment-timezone';
import ViewUserPopover from '@/components/messages/ViewUserPopover';
import DeleteMessage from '@/components/messages/DeleteMessage';
import AcceptStudent from '@/components/messages/AcceptStudent';

const NotificationList = ({ id }: { id?: string }) => {
  const { data, loading, refetch } = usePaginateNotificationsQuery({
    variables: {
      params: {
        where: {
          recipientId: id,
        },
      },
    },
    skip: !id,
  });

  return (
    <section>
      {!loading ? (
        <List
          loading={loading}
          itemLayout="horizontal"
          dataSource={data?.paginateNotifications.data}
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
                        onSuccess={() => refetch()}
                      />
                      <DeleteMessage id={item.id} onSuccess={() => refetch()} />
                    </Space>,
                  ]
                }
                author={
                  <ViewUserPopover
                    profile={item.authorId.profile as Teacher}
                    role={item.authorId.role.title}
                  />
                }
                avatar={item.authorId.profile.personalImage}
                datetime={moment(item.created).calendar()}
                content={DOMPurify.sanitize(item.content)}
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
      ) : (
        data?.paginateNotifications.data.length === 0 && (
          <Empty
            imageStyle={{
              height: 160,
            }}
            image={<BellOutlined style={{ fontSize: '8rem', color: 'gray' }} />}
            description={<span>لم تصلك أي إشعارات حتى اللحظة</span>}
          />
        )
      )}
    </section>
  );
};

export default NotificationList;
