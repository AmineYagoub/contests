export * from './lib/config.module';
export * from './contest/app.config';
export * from './contest/graphql.config';
export * from './gateway/app.config';
export * from './gateway/graphql.config';
export * from './auth/app.config';
export * from './auth/graphql.config';
export const isProd = process.env.NODE_ENV === 'production';
