import Head from 'next/head';
import { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '@/config/createEmotionCache';
import ar from 'antd/lib/locale/ar_EG';
import { ConfigProvider, notification } from 'antd';
import { ReactElement, useEffect } from 'react';
import { NextComponentType } from 'next';
import 'antd/dist/antd.variable.min.css';
import './app.css';
import theme from '@/config/theme';

// Client-side cache, shared for the whole session of the user in the browser.
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

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ConfigProvider locale={ar} direction="rtl">
        {getLayout(<Component {...pageProps} />)}
      </ConfigProvider>
    </CacheProvider>
  );
}
