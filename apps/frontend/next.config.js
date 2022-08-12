// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
const withTM = require('next-transpile-modules')(['echarts', 'zrender']);

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
    /*     removeConsole: {
      exclude: ['error'],
    }, */
  },
  images: {
    domains: ['via.placeholder.com', 'flagcdn.com'],
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
