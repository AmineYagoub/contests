import { Menu, Layout, Avatar, Button, Skeleton, Space, Input } from 'antd';
import type { MenuProps } from 'antd';
import { User } from '@/graphql/graphql';
import styled from '@emotion/styled';
import { getMapperLabel, rolesMappedTypes } from '@/utils/mapper';
import { alwaysTake } from '@/hooks/messages/contact.hook';

type MenuItem = Required<MenuProps>['items'][number];

const StyledMenu = styled(Menu)({
  backgroundColor: '#dce0e6 !important',
  li: {
    paddingLeft: '25px !important',
    boxShadow: '0 1px 3px blueviolet',
    '&.ant-menu-item': {
      margin: '0 !important',
      height: 45,
    },
  },
});

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

const LoadingStat = () => {
  return (
    <>
      {Array(alwaysTake)
        .fill(null)
        .map((e, i) => (
          <Space key={i}>
            <Skeleton.Avatar active style={{ margin: '10px 0' }} />
            <Skeleton.Input active size="small" />
          </Space>
        ))}
    </>
  );
};

const MessageContacts = ({
  users,
  collapsed,
  loadMoreData,
  loading,
  onSelect,
  selected,
  onSearch,
  searchValue,
}: {
  users: User[];
  collapsed: boolean;
  loadMoreData: () => Promise<void>;
  loading: boolean;
  onSelect: ({ key }: { key: string }) => void;
  selected: string;
  onSearch: (value: string) => void;
  searchValue: string;
}) => {
  const items: MenuItem[] = users?.map((user) => {
    const { firstName, lastName, personalImage } = user.profile;
    return getContact(
      <>
        <b>
          {firstName} {lastName}
        </b>
        <br />
        <span>{getMapperLabel(rolesMappedTypes, user.role.title)}</span>
      </>,
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
      {!collapsed && (
        <Input.Search
          placeholder="البحث في قائمة الإتصال"
          onSearch={onSearch}
          onInput={(e) => onSearch(e.currentTarget.value)}
        />
      )}
      <StyledMenu
        mode="inline"
        items={items}
        onSelect={onSelect}
        defaultSelectedKeys={[selected]}
        defaultOpenKeys={[selected]}
      />
      {loading && <LoadingStat />}

      {!collapsed && users?.length >= alwaysTake && !searchValue && (
        <Button
          onClick={loadMoreData}
          style={{ marginTop: 20 }}
          size="small"
          shape="round"
          type="primary"
          ghost
        >
          تحميل أكثر
        </Button>
      )}
    </Layout.Sider>
  );
};

export default MessageContacts;
