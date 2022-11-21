import {
  Alert,
  Avatar,
  Badge,
  Button,
  Col,
  Layout,
  Row,
  Space,
  Typography,
} from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createElement, FC, ReactElement, useEffect, useState } from 'react';

import { withAuth } from '@/components/common/withAuth';
import theme from '@/config/theme';
import { socketVar } from '@/utils/app';
import { AppRoutes } from '@/utils/routes';

import {
  BellOutlined,
  ContactsOutlined,
  HomeOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SketchCircleFilled,
  TrophyOutlined,
} from '@ant-design/icons';
import { useReactiveVar } from '@apollo/client';
import styled from '@emotion/styled';

import { Logo, StyledContent, StyledMenu } from './AdminLayout';
import StyledFooter from './StyledFooter';
import { useSnapshot } from 'valtio';
import { AuthState } from '@/valtio/auth.state';
import { User } from '@/graphql/graphql';

const { Header, Sider } = Layout;
const { Text } = Typography;

export const StyledHeader = styled(Header)({
  backgroundColor: `${theme.primaryColor} !important`,
  padding: '0 !important',
  boxShadow:
    'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
});

const ProfileLayout: FC<{ children: ReactElement; isTeacher: boolean }> = ({
  children,
  isTeacher,
}) => {
  // const socket = useReactiveVar(socketVar);
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const user = useSnapshot(AuthState).user as User;

  /*   useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, [socket]); */

  const routes = {
    dashboard: isTeacher
      ? AppRoutes.TeacherDashboard
      : AppRoutes.StudentDashboard,
    profile: isTeacher ? AppRoutes.TeacherProfile : AppRoutes.StudentProfile,
    contests: isTeacher ? AppRoutes.TeacherContests : AppRoutes.StudentContests,
    messages: isTeacher ? AppRoutes.TeacherMessages : AppRoutes.StudentMessages,
    notification: isTeacher
      ? AppRoutes.TeacherNotifications
      : AppRoutes.StudentNotifications,
  };
  const menuList = [
    {
      key: routes.dashboard,
      icon: <HomeOutlined style={{ fontSize: 18 }} />,

      label: <Link href={routes.dashboard}>الرئيسية</Link>,
    },

    {
      key: routes.profile,
      icon: <ContactsOutlined style={{ fontSize: 18 }} />,

      label: <Link href={routes.profile}>البيانات الشخصية</Link>,
    },

    {
      key: routes.contests,
      icon: <TrophyOutlined style={{ fontSize: 18 }} />,

      label: <Link href={routes.contests}>المسابقات</Link>,
    },
    {
      key: routes.messages,
      icon: <MailOutlined style={{ fontSize: 18 }} />,

      label: <Link href={routes.messages}>الرسائل</Link>,
    },
    {
      key: routes.notification,
      icon: <BellOutlined style={{ fontSize: 18 }} />,

      label: <Link href={routes.notification}>الإشعارات</Link>,
    },
  ];
  if (isTeacher) {
    menuList.push({
      key: AppRoutes.TeacherMembership,
      icon: <SketchCircleFilled style={{ fontSize: 18, color: 'gold' }} />,

      label: <Link href={AppRoutes.TeacherMembership}>ترقية العضوية</Link>,
    });
  }

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Logo />
        <StyledMenu
          mode="inline"
          defaultSelectedKeys={[router.pathname]}
          selectedKeys={[router.pathname]}
          items={menuList}
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

                <Avatar
                  src={
                    <Image
                      src={user?.profile.personalImage}
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
        {!isTeacher && !user.isActive && (
          <Alert
            style={{ marginBottom: 10 }}
            message="البيانات الشخصية الخاصة بك غير مكتملة"
            showIcon
            description={
              <>
                <p>
                  حتى تتمكن من المشاركة في المسابقات المنعقدة على الموقع يرجى
                  إكمال الخطوات التالية:
                </p>
                <ul>
                  <li>
                    <Text delete={user.emailConfirmed}>
                      تفعيل بريدك الإلكتروني
                    </Text>
                  </li>
                  <li>
                    إكمال ملفك الشخصي و تحميل الوثائق المطلوبة في صفحة البيانات
                    الشخصية
                  </li>
                </ul>
              </>
            }
            type="warning"
            action={
              <Link href={AppRoutes.StudentProfile}>صفحة البيانات الشخصية</Link>
            }
          />
        )}
        <StyledContent>{children}</StyledContent>
        <StyledFooter />
      </Layout>
    </Layout>
  );
};

export default withAuth(ProfileLayout);
