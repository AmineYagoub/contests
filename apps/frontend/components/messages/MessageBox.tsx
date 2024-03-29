import { memo, useState } from 'react';
import { Button, Card, Layout } from 'antd';
import { useSnapshot } from 'valtio';
import MessagesList from './MessageList';
import MessageEditor from './MessageEditor';
import styled from '@emotion/styled';
import MessageContacts from './MessageContacts';
import { useMessages } from '@/hooks/messages/message.hook';
import { RoleTitle, User } from '@/graphql/graphql';
import {
  MessageActions,
  MessageContentType,
  MessageState,
} from '@/valtio/message.state';
import { useContactList } from '@/hooks/messages/contact.hook';
import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons';

const StyledSection = styled(Card)({
  width: '80vw',
  backgroundColor: 'transparent !important',
  top: -20,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 10,
});

const MessageBox = ({
  role,
  id,
  profile,
  avatar,
}: {
  role: RoleTitle;
  id: string;
  avatar: string;
  profile?: string;
}) => {
  const messageSnap = useSnapshot(MessageState);
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const {
    loading,
    hasMore,
    handleMessageSubmit,
    submitLoading,
    form,
    ref,
    loadMoreArea,
    scrollArea,
  } = useMessages(id);

  const { loadMoreData, onSearch, searchValue } = useContactList(role, profile);

  return (
    <StyledSection bordered={false} bodyStyle={{ padding: 0 }}>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 5 }}
        shape="circle"
        icon={collapsed ? <LeftCircleFilled /> : <RightCircleFilled />}
      />

      <Layout>
        <MessageContacts
          collapsed={collapsed}
          users={messageSnap.contactList as User[]}
          loadMoreData={() => loadMoreData(false)}
          loading={messageSnap.contactLoading}
          onSelect={({ key }) => MessageActions.setCurrentContact(key)}
          selected={messageSnap.currentContactId}
          onSearch={onSearch}
          searchValue={searchValue}
        />

        <Layout style={{ minHeight: 'unset' }}>
          <MessagesList
            loadMoreArea={loadMoreArea}
            messages={messageSnap.messages as MessageContentType[]}
            loading={loading}
            hasMore={hasMore}
            scrollArea={scrollArea}
            viewRef={ref}
            id={id}
          />
          <MessageEditor
            id={id}
            avatar={avatar}
            disabled={!messageSnap.currentContactId}
            handleSubmit={handleMessageSubmit}
            loading={submitLoading}
            form={form}
          />
        </Layout>
      </Layout>
    </StyledSection>
  );
};

export default memo(MessageBox);
