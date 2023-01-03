import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { BellOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Empty, Badge, List, Avatar } from 'antd';
import { useFindLastNotificationsQuery } from '@/graphql/graphql';

const NotificationsDropdown = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const { data, loading } = useFindLastNotificationsQuery({
    skip: !visible,
    variables: {
      id: authUser._id,
    },
  });

  /*   useEffect(() => {
    notificationCounterVar(authUser.countUnreadNotifications);
  }, [authUser.countUnreadNotifications]);

  const setNotificationsAsViewed = async (visible: boolean) => {
    setVisible(visible);
    notificationCounterVar(0);
    if (data && authUser.countUnreadNotifications > 0) {
      const messagesForMe = [];
      const messageForAll = [];
      data.findLastNotification.forEach((el) => {
        el.sendToAll ? messageForAll.push(el._id) : messagesForMe.push(el._id);
      });
      const { data: updater } = await UpdateNotificationStatMutation({
        variables: {
          input: {
            meIds: messagesForMe,
            viewed: true,
            allIds: messageForAll,
            viewer: authUser._id,
          },
        },
      });
      if (updater?.updateNotificationStat?.matchedCount > 0) {
        notificationCounterVar(0);
      }
    }
  };

  const getRedirectTarget = () => {
    if (authUser.role.title !== RoleTitle.Client) {
      return "/dashboard/inbox";
    }
    return isMobileOnly
      ? "/profiles/notifications"
      : {
          pathname: "/profiles/[key]",
          query: {
            key: authUser.key,
            tab: ProfileTabs.USER_NOTIFY,
          },
        };
  };

  const onMessageClicked = (id: string) => {
    notificationClickedVar(id);
    setVisible(false);
    router.push(getRedirectTarget());
  }; */

  const messages = (
    <Menu>
      <Menu.Item key="1">
        {data?.findLastNotification.length > 0 || loading ? (
          <>
            <List
              itemLayout="horizontal"
              dataSource={data?.findLastNotification}
              loading={loading}
              renderItem={(message) => (
                <List.Item onClick={() => onMessageClicked(message._id)}>
                  <List.Item.Meta
                    avatar={<Avatar src={message.owner.image} />}
                    title={message.owner.username}
                    description={
                      <div
                        dangerouslySetInnerHTML={{
                          __html: getMessageContent(message.content),
                        }}
                      ></div>
                    }
                  />
                </List.Item>
              )}
            />
            <section>
              <Link href={getRedirectTarget()}>
                <a onClick={() => setVisible(false)}>مشاهدة كل الإشعارات</a>
              </Link>
            </section>
          </>
        ) : (
          data?.findLastNotification.length === 0 && (
            <Empty
              style={{ padding: '20px 0' }}
              description="لا يوجد لديك إشعارات"
            />
          )
        )}
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      overlay={messages}
      trigger={['click']}
      placement="bottomCenter"
      arrow
      onOpenChange={setNotificationsAsViewed}
      open={visible}
    >
      <Badge
        size="small"
        count={notificationCounter}
        style={{
          background: '#fff',
          color: 'red',
        }}
      >
        <Button
          type="default"
          shape="circle"
          style={{ background: 'transparent' }}
          icon={<BellOutlined />}
          onClick={() => setVisible(!visible)}
        />
      </Badge>
    </Dropdown>
  );
};

export default NotificationsDropdown;
