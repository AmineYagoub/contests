import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateMessageDto {
  @Field(() => [String], {
    description: 'Identify all my message ids that i have viewed',
  })
  @IsNotEmpty()
  @IsString({ each: true })
  meIds: string[];

  @Field()
  @IsNotEmpty()
  @IsBoolean()
  viewed: boolean;
}
