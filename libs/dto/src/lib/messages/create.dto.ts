import { MessageType } from '@contests/types';
import { InputType, Field } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

@InputType()
export class CreateMessageDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  content: string;

  @Field()
  @IsNotEmpty()
  @IsUUID()
  authorId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  recipientId?: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  sendToAll?: boolean;

  @Field(() => MessageType)
  @IsNotEmpty()
  @IsString()
  type: MessageType;
}
