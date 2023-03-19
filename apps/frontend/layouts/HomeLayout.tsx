import { Layout } from 'antd';
import theme from '@/config/theme';
import styled from '@emotion/styled';
import StyledFooter from './StyledFooter';
import HeaderIcons from '@/components/common/HeaderIcons';

const { Content, Header } = Layout;

export const StyledHeader = styled(Header)({
  backgroundColor: `${theme.primaryColor} !important`,
  padding: '0 !important',
  boxShadow:
    'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
});

const HomeLayout = ({ children }) => {
  return (
    <Layout>
      <HeaderIcons inHome />
      <Content>{children}</Content>
      <StyledFooter />
    </Layout>
  );
};

export default HomeLayout;
