export * from './lib/auth/signup.dto';
export * from './lib/auth/signing.dto';
export * from './lib/auth/signingWithGoogle.dto';
export * from './lib/users/update.dto';
export * from './lib/users/updateStudent.dto';
export * from './lib/users/updateDocuments.dto';
export * from './lib/users/pagination.dto';

import { IsEmail, IsUUID } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EmailDto {
  @Field()
  @IsEmail()
  email: string;
}

@InputType()
export class IDDto {
  @Field()
  @IsUUID()
  id: string;
}
