import 'antd/dist/antd.variable.min.css';
import './app.css';
import 'moment/locale/ar-dz';

import { ConfigProvider, notification, Spin } from 'antd';
import ar from 'antd/lib/locale/ar_EG';
import moment from 'moment-timezone';
import { NextComponentType } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement, useEffect } from 'react';

import createEmotionCache from '@/config/createEmotionCache';
import { useApollo } from '@/config/createGraphQLClient';
import theme from '@/config/theme';
import { LoadingOutlined } from '@ant-design/icons';
import { ApolloProvider } from '@apollo/client';
import { CacheProvider, EmotionCache } from '@emotion/react';
import {
  App,
  FindAppConfigDocument,
  FindAppConfigQuery,
  FindAppConfigQueryVariables,
} from '@/graphql/graphql';
import { appDataVar } from '@/utils/app';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
Spin.setDefaultIndicator(<Spin indicator={antIcon} />);
moment.tz.setDefault('Africa/Cairo');
moment.locale('ar');
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextComponentType & {
    getLayout: (page: ReactElement) => ReactElement;
  };
}

export default function CustomApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout || ((page: ReactElement) => page);

  useEffect(() => {
    notification.config({
      placement: 'topRight',
      duration: 4,
      rtl: true,
    });
    ConfigProvider.config({
      theme,
    });
  }, []);

  const apolloClient = useApollo(pageProps);

  (async () => {
    const { data } = await apolloClient.query<
      FindAppConfigQuery,
      FindAppConfigQueryVariables
    >({
      query: FindAppConfigDocument,
    });
    appDataVar(data?.findAppConfig as App);
  })();

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <ConfigProvider locale={ar} direction="rtl">
          {getLayout(<Component {...pageProps} />)}
        </ConfigProvider>
      </ApolloProvider>
    </CacheProvider>
  );
}
