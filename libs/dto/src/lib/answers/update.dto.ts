import { InputType, PartialType } from '@nestjs/graphql';

import { CreateAnswerDto } from './create.dto';

@InputType()
export class UpdateAnswerDto extends PartialType(CreateAnswerDto) {}
