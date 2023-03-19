import { Layout, PageHeader } from 'antd';
import Link from 'next/link';

import { AppRoutes } from '@/utils/routes';

import StyledFooter from './StyledFooter';
import styled from '@emotion/styled';
import Logo from '@/components/common/Logo';

const { Content } = Layout;

const StyledContent = styled(Content)({
  minHeight: '100vh !important',
  textAlign: 'center',
  form: {
    margin: '1em auto',
  },
  img: {
    objectFit: 'cover',
  },
});

const AuthLayout = ({ children }) => (
  <Layout>
    <PageHeader
      onBack={() => null}
      title={<Link href={AppRoutes.Home}>{`الرئيسية`}</Link>}
      subTitle="العودة إلى الصفحة الرئيسية"
    />
    <StyledContent>
      <Logo height={200} width={200} />
      {children}
    </StyledContent>
    <StyledFooter />
  </Layout>
);

export default AuthLayout;
