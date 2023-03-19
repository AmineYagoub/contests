import { MessageType } from '@contests/types';
import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class SendMessageDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  content: string;

  @Field()
  @IsNotEmpty()
  @IsUUID()
  authorId: string;

  @Field(() => [String])
  @IsNotEmpty()
  @IsString({ each: true })
  recipients: string[];

  @Field(() => MessageType)
  @IsNotEmpty()
  @IsString()
  type: MessageType;
}
