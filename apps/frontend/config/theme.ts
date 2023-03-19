import { Theme } from 'antd/lib/config-provider/context';

type AppTheme = Theme & {
  positiveColor: string;
  negativeColor: string;
};

const theme: AppTheme = {
  primaryColor: '#6d90e8',
  infoColor: '#ececec',
  positiveColor: '#00c89f',
  negativeColor: '#ff6464',
};
export default theme;
