import { withAuth } from '@/components/common/withAuth';
import { PermissionTitle } from '@/graphql/graphql';
import AdminLayout from '@/layout/AdminLayout';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { Teacher, usePaginateNotificationsQuery } from '@/graphql/graphql';
import { List, Empty, Comment, Divider, Button } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import moment from 'moment-timezone';
import ViewUserPopover from '@/components/messages/ViewUserPopover';
import DeleteMessage from '@/components/messages/DeleteMessage';
import HtmlContent from '@/components/common/HtmlContent';
import { useState } from 'react';
import SendMessages from '@/components/messages/SendMessages';

const ManageNotifications = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const { data, loading, refetch } = usePaginateNotificationsQuery({
    variables: {
      params: {
        where: {
          recipientId: null,
        },
      },
    },
  });

  return (
    <section style={{ minHeight: '80vh' }}>
      <Button
        type="primary"
        onClick={showDrawer}
        size="large"
        style={{ float: 'left', zIndex: 10 }}
      >
        أرسل رسالة
      </Button>
      {!loading ? (
        <List
          loading={loading}
          itemLayout="horizontal"
          dataSource={data?.paginateNotifications.data}
          renderItem={(item) => (
            <>
              <Comment
                actions={[
                  <DeleteMessage
                    id={item.id}
                    onSuccess={() => refetch()}
                    key="delete-message"
                  />,
                ]}
                author={
                  <ViewUserPopover
                    profile={item.authorId.profile as Teacher}
                    role={item.authorId.role?.title}
                  />
                }
                avatar={item.authorId.profile.personalImage}
                datetime={moment(item.created).calendar()}
                content={<HtmlContent html={item.content} />}
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
            description={<span>لا يوجد أي إشعارات حتى اللحظة</span>}
          />
        )
      )}
      <SendMessages
        onClose={onClose}
        visible={visible}
        onSuccess={() => refetch()}
      />
    </section>
  );
};

ManageNotifications.getLayout = (page: EmotionJSX.Element) => (
  <AdminLayout>{page}</AdminLayout>
);

export default withAuth(ManageNotifications, [PermissionTitle.AccessDashboard]);
