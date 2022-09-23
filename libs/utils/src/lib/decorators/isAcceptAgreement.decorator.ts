import { registerDecorator, ValidationOptions } from 'class-validator';

export function isAcceptAgreement(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isAcceptAgreement',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          return typeof value === 'boolean' && value === true;
        },
      },
    });
  };
}
