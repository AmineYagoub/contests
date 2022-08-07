import styled from '@emotion/styled';
import { Button, Col, Layout, Row } from 'antd';
import theme from '@/config/theme';
import { Logo } from './AdminDashboardLayout';
import Link from 'next/link';
import StyledFooter from './StyledFooter';
import { AppRoutes } from '@/config/routes';
const { Content, Header } = Layout;

export const StyledHeader = styled(Header)({
  backgroundColor: `${theme.primaryColor} !important`,
  padding: '0 !important',
  boxShadow:
    'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
});

const StyledButton = styled(Button)`
  background-color: #fafafa !important;
  color: #6d90e8 !important;
  box-shadow: 0 0 20px #eee;
  border: none !important;
`;

const HomeLayout = ({ children }) => (
  <Layout>
    <StyledHeader>
      <Row justify="space-between">
        <Col span={4}>
          <Logo />
        </Col>
        <Col span={17}></Col>
        <Col span={3}>
          <Link href={AppRoutes.SignUp}>
            <StyledButton size="middle">تسجيل / دخول</StyledButton>
          </Link>
        </Col>
      </Row>
    </StyledHeader>
    <Content>{children}</Content>
    <StyledFooter />
  </Layout>
);

export default HomeLayout;
