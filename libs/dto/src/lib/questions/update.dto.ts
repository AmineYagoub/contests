import { InputType, PartialType } from '@nestjs/graphql';

import { CreateQuestionDto } from './create.dto';

@InputType()
export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {}
