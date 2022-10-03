import { IsOptional, IsString } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDocumentsDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  personalImage?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  birthCertImage?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  letterImage?: string;
}
