export const generateUserKey = () =>
  Math.floor(Math.random() * (99999999 - 10) + 10);

export * from './lib/filters/all-exception.filter';
export * from './lib/decorators/roles.decorator';
export * from './lib/decorators/user.decorator';
export * from './lib/decorators/isAcceptAgreement.decorator';
export * from './lib/decorators/isPasswordMatch.decorator';
export * from './lib/decorators/isStudentHasTeacher.decorator';
export * from './lib/decorators/isPublic.decorator';
export * from './lib/interceptors/nonce.interceptor';
export * from './lib/guards/auth.guard';
export * from './lib/seed/seed';
export * from './lib/seed/topics';
