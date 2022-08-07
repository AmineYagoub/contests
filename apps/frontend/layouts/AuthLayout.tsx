import { Layout, PageHeader } from "antd";

const { Footer, Content } = Layout;

const AuthLayout = ({ children }) => (
  <Layout>
    <PageHeader
      onBack={() => null}
      title="الرئيسية"
      subTitle="العودة إلى الصفحة الرئيسية"
    />
    <Content>{children}</Content>
    <Footer>Footer</Footer>
  </Layout>
);

export default AuthLayout;
