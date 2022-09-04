import styled from '@emotion/styled';
import { Avatar, Badge, Button, Col, Layout, Row, Space } from 'antd';
import theme from '@/config/theme';
import { Logo } from './AdminDashboardLayout';
import StyledFooter from './StyledFooter';
import Image from 'next/image';
import { BellOutlined, MailOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useReactiveVar } from '@apollo/client';
import { socketVar } from '@/utils/app';
const { Content, Header } = Layout;

export const StyledHeader = styled(Header)({
  backgroundColor: `${theme.primaryColor} !important`,
  padding: '0 !important',
  boxShadow:
    'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
});

const ProfileLayout = ({ children }) => {
  const socket = useReactiveVar(socketVar);
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <Layout>
      <StyledHeader>
        <Row justify="space-between">
          <Col span={4}>
            <Logo />
          </Col>
          <Col span={17}></Col>
          <Col span={3}>
            <Space size={8}>
              <Button
                icon={<MailOutlined style={{ color: theme.infoColor }} />}
                shape="circle"
                type="ghost"
              />
              <Badge dot>
                <Button
                  icon={<BellOutlined style={{ color: theme.infoColor }} />}
                  shape="circle"
                  type="ghost"
                />
              </Badge>
              <Avatar
                src={
                  <Image
                    src="https://joeschmoe.io/api/v1/random"
                    width={32}
                    height={32}
                    alt="avatar"
                  />
                }
              />
            </Space>
          </Col>
        </Row>
      </StyledHeader>
      <Content>{children}</Content>
      <StyledFooter />
    </Layout>
  );
};

export default ProfileLayout;
