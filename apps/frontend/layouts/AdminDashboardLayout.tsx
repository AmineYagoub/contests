import { Layout, Menu } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  IdcardOutlined,
  BarChartOutlined,
  MailOutlined,
  BellOutlined,
  TrophyOutlined,
  EditOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { createElement, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import TeacherIcon from '@/components/icons/TeacherIcon';
import StyledFooter from './StyledFooter';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AppRoutes } from '@/config/routes';
import { StyledHeader } from './HomeLayout';

const { Content, Header, Sider } = Layout;

const StyledContent = styled(Content)({
  margin: 25,
  padding: 25,
  width: '95% !important',
  backgroundColor: '#fff',
  boxShadow:
    '0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)',
});

export const Logo = styled('div')({
  height: 32,
  margin: 16,
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
});

const StyledMenu = styled(Menu)({
  height: 'calc(100% - 64px)',
  paddingTop: '22px !important',
});

const AdminDashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Logo />
        <StyledMenu
          mode="inline"
          defaultSelectedKeys={['1']}
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
          ]}
        />
      </Sider>
      <Layout>
        <StyledHeader>
          {createElement(!collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </StyledHeader>
        <StyledContent>{children}</StyledContent>
        <StyledFooter />
      </Layout>
    </Layout>
  );
};

export default AdminDashboardLayout;
