import { AppRoutes } from '@/config/routes';
import { Layout, PageHeader } from 'antd';
import Link from 'next/link';
import StyledFooter from './StyledFooter';

const { Content } = Layout;

const AuthLayout = ({ children }) => (
  <Layout>
    <PageHeader
      onBack={() => null}
      title={<Link href={AppRoutes.Home}>{`الرئيسية`}</Link>}
      subTitle="العودة إلى الصفحة الرئيسية"
    />
    <Content>{children}</Content>
    <StyledFooter />
  </Layout>
);

export default AuthLayout;
