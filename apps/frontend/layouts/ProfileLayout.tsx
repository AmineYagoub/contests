import { Alert, Avatar, Badge, Button, Col, Layout, Row, Space } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createElement, useEffect, useState } from 'react';

import { withAuth } from '@/components/common/withAuth';
import theme from '@/config/theme';
import { socketVar } from '@/utils/app';
import { AppRoutes } from '@/utils/routes';
import {
  BellOutlined,
  CheckCircleFilled,
  ContactsOutlined,
  HomeOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { useReactiveVar } from '@apollo/client';
import styled from '@emotion/styled';

import { Logo, StyledContent, StyledMenu } from './AdminLayout';
import StyledFooter from './StyledFooter';

const { Header, Sider } = Layout;

export const StyledHeader = styled(Header)({
  backgroundColor: `${theme.primaryColor} !important`,
  padding: '0 !important',
  boxShadow:
    'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
});

const ProfileLayout = ({ children }) => {
  // const socket = useReactiveVar(socketVar);
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  /*   useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, [socket]); */

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Logo />
        <StyledMenu
          mode="inline"
          defaultSelectedKeys={[router.pathname]}
          selectedKeys={[router.pathname]}
          items={[
            {
              key: AppRoutes.StudentDashboard,
              icon: <HomeOutlined style={{ fontSize: 18 }} />,

              label: <Link href={AppRoutes.StudentDashboard}>الرئيسية</Link>,
            },
            {
              key: AppRoutes.StudentProfile,
              icon: <ContactsOutlined style={{ fontSize: 18 }} />,

              label: (
                <Link href={AppRoutes.StudentProfile}>البيانات الشخصية</Link>
              ),
            },
            {
              key: AppRoutes.StudentContests,
              icon: <TrophyOutlined style={{ fontSize: 18 }} />,

              label: <Link href={AppRoutes.StudentContests}>المسابقات</Link>,
            },
            {
              key: AppRoutes.StudentMessages,
              icon: <MailOutlined style={{ fontSize: 18 }} />,

              label: <Link href={AppRoutes.StudentMessages}>الرسائل</Link>,
            },
            {
              key: AppRoutes.StudentNotifications,
              icon: <BellOutlined style={{ fontSize: 18 }} />,

              label: (
                <Link href={AppRoutes.StudentNotifications}>الإشعارات</Link>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <StyledHeader>
          <Row justify="space-between">
            <Col span={2}>
              {createElement(
                !collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: 'trigger',
                  onClick: () => setCollapsed(!collapsed),
                }
              )}
            </Col>

            <Col span={4}>
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
                <Badge
                  offset={[5, 30]}
                  count={<CheckCircleFilled style={{ color: 'aqua' }} />}
                >
                  <Avatar
                    src={
                      <Image
                        src="https://joeschmoe.io/api/v1/joe"
                        width={32}
                        height={32}
                        alt="avatar"
                      />
                    }
                  />
                </Badge>
              </Space>
            </Col>
          </Row>
        </StyledHeader>
        <StyledContent>
          <Alert
            style={{ marginBottom: 10 }}
            message="البيانات الشخصية الخاصة بك غير مكتملة"
            showIcon
            description="حتى تتمكن من المشاركة في المسابقات المنعقدة على الموقع يرجى إكمال ملفك الشخصي."
            type="warning"
            action={
              <Link href={AppRoutes.StudentProfile}>صفحة البيانات الشخصية</Link>
            }
          />
          {children}
        </StyledContent>
        <StyledFooter />
      </Layout>
    </Layout>
  );
};

export default withAuth(ProfileLayout);
