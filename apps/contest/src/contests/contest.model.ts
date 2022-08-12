import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum ContestStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  NOT_STARTED = 'NOT_STARTED',
}

export enum ContestLevel {
  Eighteen = 'Eighteen',
  Fifteen = 'Fifteen',
  Fourteen = 'Fourteen',
  Nineteen = 'Nineteen',
  Seventeen = 'Seventeen',
  Sixteen = 'Sixteen',
  Thirteen = 'Thirteen',
}

registerEnumType(ContestStatus, {
  name: 'ContestStatus',
  description: 'Contest Status',
});

registerEnumType(ContestLevel, {
  name: 'ContestLevel',
  description: 'Contest Level',
});

@ObjectType()
export class Contest {
  @Field(() => Int)
  id: number;

  @Field({
    description: 'Identifies the title of the Contest.',
  })
  title: string;

  @Field(() => Int, {
    description: 'Identifies the duration of the Contest.',
  })
  duration: number;

  @Field(() => ContestLevel, {
    description: 'Identifies the level of the Contest.',
  })
  level: ContestLevel;

  @Field(() => Boolean, {
    description: 'Identifies IF the Contest is published or not.',
  })
  published: boolean;

  @Field(() => Int, {
    description: 'Identifies the author of the Contest.',
  })
  authorId: number;

  @Field(() => ContestStatus, {
    description: 'Identifies the status of the Contest.',
  })
  status: ContestStatus;

  @Field({
    description: 'Identifies the date and time when contest started.',
  })
  startTime: Date;

  @Field(() => [String], {
    description: 'Identifies the date and time when contest started.',
    nullable: true,
  })
  participants?: string[];

  @Field(() => Int, {
    description: 'Identifies how many questions in the Contest.',
  })
  questionCount: number;

  @Field(() => Int, {
    description: 'Identifies the max number of Participants in the Contest.',
  })
  maxParticipants: number;

  @Field({
    description: 'Identifies the date and time when the object was created.',
  })
  created: Date;

  @Field({
    description:
      'Identifies the date and time when the object was last updated.',
  })
  updated: Date;
}
