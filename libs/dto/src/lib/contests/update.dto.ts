import { InputType, PartialType } from '@nestjs/graphql';

import { CreateContestDto } from './create.dto';

@InputType()
export class UpdateContestDto extends PartialType(CreateContestDto) {}
