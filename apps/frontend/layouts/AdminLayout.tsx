import { Layout, Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import TeacherIcon from '@/components/icons/TeacherIcon';
import { socketVar } from '@/utils/app';
import { AppRoutes } from '@/utils/routes';
import {
  BarChartOutlined,
  BellOutlined,
  EditOutlined,
  IdcardOutlined,
  LogoutOutlined,
  MailOutlined,
  SettingOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { useReactiveVar } from '@apollo/client';
import styled from '@emotion/styled';

import StyledFooter from './StyledFooter';
import HeaderIcons from '@/components/common/HeaderIcons';
import { useSnapshot } from 'valtio';
import { AuthState } from '@/valtio/auth.state';

const { Content, Sider } = Layout;

export const StyledContent = styled(Content)({
  width: '95% !important',
  backgroundColor: 'transparent',
  marginTop: '1rem',
  minHeight: '90vh !important',
});

export const Logo = styled('div')({
  height: 32,
  margin: 16,
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
});

export const StyledMenu = styled(Menu)({
  height: 'calc(100% - 64px)',
  paddingTop: '22px !important',
});

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const socket = useReactiveVar(socketVar);

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
          defaultSelectedKeys={[AppRoutes.AdminManageDashboard]}
          selectedKeys={[router.pathname]}
          items={[
            {
              key: AppRoutes.AdminManageDashboard,
              icon: <BarChartOutlined style={{ fontSize: 18 }} />,

              label: (
                <Link
                  href={AppRoutes.AdminManageDashboard}
                >{`لوحة التحكم`}</Link>
              ),
            },
            {
              key: AppRoutes.AdminManageInstructors,
              icon: <TeacherIcon style={{ fontSize: 18 }} />,
              label: (
                <Link
                  href={AppRoutes.AdminManageInstructors}
                >{`إدارة المعلمين`}</Link>
              ),
            },
            {
              key: AppRoutes.AdminManageStudents,
              icon: <IdcardOutlined style={{ fontSize: 18 }} />,

              label: (
                <Link
                  href={AppRoutes.AdminManageStudents}
                >{`إدارة الطلاب`}</Link>
              ),
            },
            {
              key: AppRoutes.AdminManageContests,
              icon: <TrophyOutlined style={{ fontSize: 18 }} />,

              label: (
                <Link
                  href={AppRoutes.AdminManageContests}
                >{`إدارة المسابقات`}</Link>
              ),
            },
            {
              key: AppRoutes.AdminManageQuestions,
              icon: <EditOutlined style={{ fontSize: 18 }} />,

              label: (
                <Link
                  href={AppRoutes.AdminManageQuestions}
                >{`إدارة أسئلة المسابقات`}</Link>
              ),
            },
            {
              key: AppRoutes.AdminManageMessages,
              icon: <MailOutlined style={{ fontSize: 18 }} />,

              label: (
                <Link href={AppRoutes.AdminManageMessages}>{`الرسائل`}</Link>
              ),
            },
            {
              key: AppRoutes.AdminManageNotifications,
              icon: <BellOutlined style={{ fontSize: 18 }} />,

              label: (
                <Link
                  href={AppRoutes.AdminManageNotifications}
                >{`الإشعارات`}</Link>
              ),
            },
            {
              key: AppRoutes.AdminManageSettings,
              icon: <SettingOutlined style={{ fontSize: 18 }} />,

              label: (
                <Link href={AppRoutes.AdminManageSettings}>{`الإعدادات`}</Link>
              ),
            },
            {
              key: AppRoutes.SignOut,
              icon: <LogoutOutlined style={{ fontSize: 18 }} />,
              label: <Link href={AppRoutes.SignOut}>تسجيل الخروج</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <HeaderIcons />
        <StyledContent>{children}</StyledContent>
        <StyledFooter />
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
