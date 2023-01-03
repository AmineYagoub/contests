import {
  Avatar,
  Badge,
  Button,
  Col,
  Layout,
  List,
  Popover,
  Row,
  Space,
} from 'antd';
import Image from 'next/image';

import { createElement, useState } from 'react';

import theme from '@/config/theme';

import {
  BellOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import styled from '@emotion/styled';
import { useHeaderNotification } from '@/hooks/messages/header.hook';
import { Message, RoleTitle } from '@/graphql/graphql';
import Link from 'next/link';
import { getMessageContent, getMessageVariant } from '@/utils/app';
import { Logo } from '@/layout/AdminLayout';
import StyledButton from './StyledButton';
import { AppRoutes, redirect } from '@/utils/routes';
import { useRouter } from 'next/router';

const { Header } = Layout;

const StyledHeader = styled(Header)({
  backgroundColor: `${theme.primaryColor} !important`,
  padding: '0 !important',
  boxShadow:
    'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
});

const messages = (
  data: Message[],
  loading: boolean,
  role: RoleTitle,
  content: 'm' | 'n'
) => {
  const vars = getMessageVariant(role, content);
  return (
    <>
      <List
        style={{ width: 300, height: 350, overflowY: 'scroll' }}
        itemLayout="horizontal"
        dataSource={data}
        loading={loading}
        renderItem={(message) => (
          <Link href={vars.route}>
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={message.authorId.profile.personalImage} />}
                title={`${message.authorId.profile.firstName} ${message.authorId.profile.lastName}`}
                description={
                  <div
                    dangerouslySetInnerHTML={{
                      __html: getMessageContent(message.content),
                    }}
                  ></div>
                }
              />
            </List.Item>
          </Link>
        )}
      />
      <section style={{ textAlign: 'center' }}>
        <Link href={vars.route}>{vars.link}</Link>
      </section>
    </>
  );
};

const HeaderIcons = ({ inHome = false }: { inHome?: boolean }) => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const {
    data,
    loading,
    openDropdown,
    countMessages,
    countNotification,
    user,
  } = useHeaderNotification();
  return (
    <StyledHeader>
      <Row justify="space-between">
        <Col span={2}>
          {inHome ? (
            <Logo />
          ) : (
            createElement(!collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })
          )}
        </Col>

        <Col span={4}>
          {user ? (
            <Space size={12}>
              <Badge count={countMessages > 0 ? countMessages : 0}>
                <Popover
                  title={null}
                  content={() => messages(data, loading, user.role.title, 'm')}
                  trigger="click"
                  onOpenChange={(visible: boolean) =>
                    openDropdown(visible, 'm')
                  }
                >
                  <Button
                    icon={<MailOutlined style={{ color: theme.infoColor }} />}
                    shape="circle"
                    type="ghost"
                  />
                </Popover>
              </Badge>
              <Badge count={countNotification > 0 ? countNotification : 0}>
                <Popover
                  title={null}
                  content={() => messages(data, loading, user.role.title, 'n')}
                  trigger="click"
                  onOpenChange={(visible: boolean) =>
                    openDropdown(visible, 'n')
                  }
                  placement="bottomRight"
                >
                  <Button
                    icon={<BellOutlined style={{ color: theme.infoColor }} />}
                    shape="circle"
                    type="ghost"
                  />
                </Popover>
              </Badge>

              <Avatar
                onClick={() => redirect(router, user.role.title)}
                style={{ cursor: 'pointer' }}
                src={
                  <Image
                    src={user.profile.personalImage}
                    width={32}
                    height={32}
                    alt="avatar"
                  />
                }
              />
            </Space>
          ) : (
            <Link href={AppRoutes.SignUp}>
              <StyledButton size="middle">تسجيل / دخول</StyledButton>
            </Link>
          )}
        </Col>
      </Row>
    </StyledHeader>
  );
};

export default HeaderIcons;
