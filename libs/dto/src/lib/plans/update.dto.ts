import { InputType, PartialType } from '@nestjs/graphql';
import { CreateSubscriptionPlansDto } from './create.dto';

@InputType()
export class UpdateSubscriptionPlansDto extends PartialType(
  CreateSubscriptionPlansDto
) {}
