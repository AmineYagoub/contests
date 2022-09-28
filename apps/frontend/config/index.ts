export interface AppConfig {
  jwtName: string;
  refreshJwtName: string;
  nonceName: string;
  isProduction: boolean;
}
const isProd = process.env.NODE_ENV !== 'development';
export const config: AppConfig = {
  isProduction: isProd,
  jwtName: 'aoc_jwt',
  refreshJwtName: 'aoc_jwt_ref',
  nonceName: isProd ? '__Host_Fgp_nonce' : 'fgp_nonce',
};
