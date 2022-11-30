import { InputType, Field } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

@InputType()
export class UpdateMessageDto {
  @Field(() => [String], {
    description: 'Identify all my message ids that i have viewed',
  })
  @IsNotEmpty()
  @IsString({ each: true })
  meIds: string[];

  @Field(() => [String], {
    description:
      'Identify all message ids sended from admin that i have viewed',
  })
  @IsNotEmpty()
  @IsString({ each: true })
  allIds: string[];

  @Field()
  @IsNotEmpty()
  @IsBoolean()
  viewed: boolean;

  @Field()
  @IsOptional()
  @IsUUID()
  viewerId?: string;
}
