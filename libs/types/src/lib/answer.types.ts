import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
abstract class SelectedAnswer {
  @Field({
    description: 'Identifies the id of the question.',
  })
  questionId: string;

  @Field(() => Int, {
    description:
      'Identifies the index of the question in the contest.questions Array.',
  })
  questionIndex: number;

  @Field(() => Int, {
    description: 'Identifies the index of the option selected by the user.',
  })
  optionIndex: number;

  @Field({
    description: 'Identifies the option selected by the user.',
  })
  option: string;

  @Field(() => [String], {
    description: 'Identifies the random list of options as received.',
  })
  options: string[];
}
@InputType()
export class SelectedAnswerInput extends SelectedAnswer {}
@ObjectType()
export class SelectedAnswerObject extends SelectedAnswer {}
