import { useState } from 'react';
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
  avatar,
}: {
  role: RoleTitle;
  id: string;
  avatar: string;
}) => {
  const messageSnap = useSnapshot(MessageState);
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const { loading, hasMore, handleMessageSubmit, submitLoading, form, ref } =
    useMessages(id);

  const { loadMoreData, onSearch, searchValue } = useContactList(role, id);

  return (
    <StyledSection
      bordered={false}
      bodyStyle={{ padding: 0 }}
      title={
        <Button type="primary" onClick={toggleCollapsed}>
          قائمة الإتصال
        </Button>
      }
    >
      <Layout>
        <MessageContacts
          collapsed={collapsed}
          users={messageSnap.contactList as User[]}
          loadMoreData={loadMoreData}
          loading={messageSnap.contactLoading}
          onSelect={({ key }) => MessageActions.setCurrentContact(key)}
          selected={messageSnap.currentContactId}
          onSearch={onSearch}
          searchValue={searchValue}
        />

        <Layout style={{ minHeight: 'unset' }}>
          <MessagesList
            messages={messageSnap.messages as MessageContentType[]}
            loading={loading}
            hasMore={hasMore}
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

export default MessageBox;
