import { useState } from 'react';
import { Button, Card, Layout, Tooltip, Tag } from 'antd';
import { useSnapshot } from 'valtio';
import { AuthState } from '@/valtio/auth.state';
import MessagesList from './MessageList';
import MessageEditor from './MessageEditor';
import styled from '@emotion/styled';
import MessageContacts from './MessageContacts';
import { useMessages } from '@/hooks/messages/message.hook';
import { Message, RoleTitle, User } from '@/graphql/graphql';
import moment from 'moment-timezone';
import { ClockCircleOutlined } from '@ant-design/icons';
import DOMPurify from 'isomorphic-dompurify';
import { MessageContentType, MessageState } from '@/valtio/message.state';
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

export const getMessage = (message: Message): MessageContentType => {
  const profile = message.authorId.profile;
  return {
    id: message.id,
    authorName: `${profile.firstName} ${profile.lastName}`,
    authorId: message.authorId.id,
    avatar: profile.personalImage,
    content: DOMPurify.sanitize(message.content),
    datetime: (
      <Tooltip title={moment(message.created).format('h:mm:ss a')}>
        <Tag
          color="green"
          icon={<ClockCircleOutlined style={{ color: 'green' }} />}
          style={{ borderRadius: 35 }}
        >
          {moment(message.created).format('LLLL')}
        </Tag>
      </Tooltip>
    ),
  };
};

const MessageBox = ({ role, id }: { role: RoleTitle; id: string }) => {
  const messageSnap = useSnapshot(MessageState);
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const { loading, hasMore } = useMessages(id, getMessage);

  const { loadMoreData } = useContactList(role);

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
        />

        <Layout>
          <MessagesList messages={[]} loading={loading} hasMore={hasMore} />
          <MessageEditor id={id} avatar="" />
        </Layout>
      </Layout>
    </StyledSection>
  );
};

export default MessageBox;
