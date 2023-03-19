import {
  BellOutlined,
  MailOutlined,
  EditOutlined,
  IdcardOutlined,
  LogoutOutlined,
  TrophyOutlined,
  SettingOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { useEffect } from 'react';
import { Layout, Menu } from 'antd';
import styled from '@emotion/styled';
import { useSnapshot } from 'valtio';
import { socketVar } from '@/utils/app';
import { useRouter } from 'next/router';
import StyledFooter from './StyledFooter';
import { AppRoutes } from '@/utils/routes';
import Logo from '@/components/common/Logo';
import { AppState } from '@/valtio/app.state';
import { useReactiveVar } from '@apollo/client';
import TeacherIcon from '@/components/icons/TeacherIcon';
import HeaderIcons from '@/components/common/HeaderIcons';

const { Content, Sider } = Layout;

export const StyledContent = styled(Content)({
  width: '95% !important',
  backgroundColor: 'transparent',
  marginTop: '1rem',
  minHeight: '90vh !important',
});

export const StyledSideBar = styled(Sider)({
  backgroundColor: '#fff !important',
  '.logo': {
    display: 'flex',
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const socket = useReactiveVar(socketVar);
  const collapsed = useSnapshot(AppState).sidebarCollapsed;

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <Layout>
      <StyledSideBar trigger={null} collapsible collapsed={collapsed}>
        <Logo height={55} width={64} />
        <Menu
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
      </StyledSideBar>
      <Layout>
        <HeaderIcons />
        <StyledContent>{children}</StyledContent>
        <StyledFooter />
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
