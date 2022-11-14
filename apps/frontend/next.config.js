// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
const withTM = require('next-transpile-modules')(['echarts', 'zrender']);

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/

const nextConfig = {
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  reactStrictMode: true,
  compiler: {
    emotion: true,
    /*     removeConsole: {
      exclude: ['error'],
    }, */
  },
  images: {
    domains: [
      'ui-avatars.com',
      'flagcdn.com',
      'upload.wikimedia.org',
      's3.olympiadnahw.com',
      'localhost',
    ],
  },
  i18n: {
    locales: ['ar'],
    defaultLocale: 'ar',
  },
  nx: {
    svgr: false,
  },
};

module.exports = withTM(withNx(nextConfig));
