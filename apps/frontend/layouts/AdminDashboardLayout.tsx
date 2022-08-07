import { Layout, Menu } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  IdcardOutlined,
  BarChartOutlined,
  UserSwitchOutlined,
  MailOutlined,
  BellOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { createElement, useState } from "react";
import styled from "@emotion/styled";

const { Content, Header, Sider } = Layout;

const StyledContent = styled(Content)({
  margin: 25,
  padding: 25,
  width: "95% !important",
  backgroundColor: "#fff",
  boxShadow:
    "0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)",
});

const Logo = styled("div")({
  height: 32,
  margin: 16,
  backgroundColor: "rgba(255, 255, 255, 0.3)",
});

const StyledMenu = styled(Menu)({
  height: "calc(100% - 64px)",
  paddingTop: "22px !important",
});

const AdminDashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Logo />
        <StyledMenu
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <BarChartOutlined style={{ fontSize: 18 }} />,
              label: "لوحة التحكم",
            },
            {
              key: "2",
              icon: <UserSwitchOutlined style={{ fontSize: 18 }} />,
              label: "إدارة المعلمين",
            },
            {
              key: "3",
              icon: <IdcardOutlined style={{ fontSize: 18 }} />,
              label: "إدارة الطلاب",
            },
            {
              key: "4",
              icon: <TrophyOutlined style={{ fontSize: 18 }} />,
              label: "إدارة المسابقات",
            },
            {
              key: "5",
              icon: <MailOutlined style={{ fontSize: 18 }} />,
              label: "الرسائل",
            },
            {
              key: "6",
              icon: <BellOutlined style={{ fontSize: 18 }} />,
              label: "الإشعارات",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: "trigger",
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <StyledContent>{children}</StyledContent>
      </Layout>
    </Layout>
  );
};

export default AdminDashboardLayout;
