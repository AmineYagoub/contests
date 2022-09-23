export const generateUserKey = () =>
  Math.floor(Math.random() * (99999999 - 10) + 10);

export * from './lib/filters/all-exception.filter';
export * from './lib/decorators/roles.decorator';
export * from './lib/decorators/isAcceptAgreement.decorator';
export * from './lib/decorators/isPasswordMatch.decorator';
export * from './lib/decorators/isStudentHasTeacher.decorator';
