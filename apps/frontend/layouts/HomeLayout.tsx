import { Layout } from 'antd';

import theme from '@/config/theme';
import styled from '@emotion/styled';
import StyledFooter from './StyledFooter';
import { useReactiveVar } from '@apollo/client';
import { appDataVar, getTitleMeta } from '@/utils/app';
import Head from 'next/head';
import HeaderIcons from '@/components/common/HeaderIcons';

const { Content, Header } = Layout;

export const StyledHeader = styled(Header)({
  backgroundColor: `${theme.primaryColor} !important`,
  padding: '0 !important',
  boxShadow:
    'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
});

const HomeLayout = ({ children }) => {
  const siteData = useReactiveVar(appDataVar);

  return (
    <>
      <Head>
        <title>{getTitleMeta(siteData?.title)}</title>
        <meta name="description" content={siteData?.description} key="desc" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@olympiadnahw" />
        <meta name="twitter:creator" content="@olympiadnahw" />
        <meta name="twitter:domain" content="olympiadnahw.com/"></meta>
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_SA" />
        <meta property="og:site_name" content={siteData?.title} />

        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#6f31a0" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, viewport-fit=cover"
        />
        <meta name="robots" content="index, nofollow" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
      </Head>
      <Layout>
        <HeaderIcons inHome />
        <Content>{children}</Content>
        <StyledFooter />
      </Layout>
    </>
  );
};

export default HomeLayout;
