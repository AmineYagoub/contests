import { Menu, Layout, Avatar, Button } from 'antd';
import type { MenuProps } from 'antd';
import { User } from '@/graphql/graphql';

type MenuItem = Required<MenuProps>['items'][number];

function getContact(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const MessageContacts = ({
  users,
  collapsed,
  loadMoreData,
}: {
  users: User[];
  collapsed: boolean;
  loadMoreData: () => Promise<void>;
}) => {
  const items: MenuItem[] = users.map((user) => {
    const { firstName, lastName, personalImage } = user.profile;
    return getContact(
      `${firstName} ${lastName}`,
      user.id,
      <Avatar src={personalImage} alt="logo" />
    );
  });
  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        maxHeight: 470,
        marginLeft: 10,
        backgroundColor: '#dce0e6',
        textAlign: 'center',
        overflow: 'scroll',
      }}
    >
      <Menu
        mode="inline"
        inlineCollapsed={collapsed}
        items={items}
        style={{ backgroundColor: '#dce0e6' }}
      />

      {/* <List
        dataSource={users}
        itemLayout='horizontal'
        renderItem={(item) => {
          const { firstName, lastName, personalImage } = item.profile;
          console.log(personalImage);
          return (
            <List.Item key={item.id}>
              <Skeleton avatar title={false} loading={false} active>
                <List.Item.Meta
                  avatar={<Avatar src={personalImage} />}
                  title={`${firstName} ${lastName}`}
                />
              </Skeleton>
            </List.Item>
          );
        }}
      /> */}

      <Button onClick={loadMoreData}>تحميل أكثر</Button>
    </Layout.Sider>
  );
};

export default MessageContacts;
