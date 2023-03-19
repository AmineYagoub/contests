import './app.css';
import 'moment/locale/ar-dz';
import 'antd/dist/antd.variable.min.css';

import theme from '@/config/theme';
import { AppProps } from 'next/app';
import moment from 'moment-timezone';
import ar from 'antd/lib/locale/ar_EG';
import { NextComponentType } from 'next';
import { ApolloProvider } from '@apollo/client';
import { ReactElement, useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { useApollo } from '@/config/createGraphQLClient';
import { ConfigProvider, notification, Spin } from 'antd';
import createEmotionCache from '@/config/createEmotionCache';
import { CacheProvider, EmotionCache } from '@emotion/react';

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
  return (
    <CacheProvider value={emotionCache}>
      <ApolloProvider client={apolloClient}>
        <ConfigProvider locale={ar} direction="rtl">
          <Component {...pageProps} />
        </ConfigProvider>
      </ApolloProvider>
    </CacheProvider>
  );
}
