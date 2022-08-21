import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SignUpDto {
  @Field()
  @IsNotEmpty()
  @IsEmail({
    message: 'email_invalid',
  })
  email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(8, {
    message: 'password_invalid',
  })
  name: string;
}
