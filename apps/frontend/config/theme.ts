import { Theme } from 'antd/lib/config-provider/context';

type AppTheme = Theme & {
  positiveColor: string;
  negativeColor: string;
};

const theme: AppTheme = {
  primaryColor: '#6d90e8',
  infoColor: '#ececec',
  positiveColor: '#00c9a7',
  negativeColor: '#ff8066',
};
export default theme;
