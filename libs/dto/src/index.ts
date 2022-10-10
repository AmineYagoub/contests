export * from './lib/contests/create.dto';
export * from './lib/contests/pagination.dto';
export * from './lib/contests/update.dto';
export * from './lib/questions/create.dto';
export * from './lib/questions/update.dto';
export * from './lib/questions/pagination.dto';
export * from './lib/answers/create.dto';
export * from './lib/answers/update.dto';
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
