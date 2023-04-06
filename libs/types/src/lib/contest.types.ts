import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prisma } from '@prisma/contest-service';

export enum ContestStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  NOT_STARTED = 'NOT_STARTED',
}

registerEnumType(ContestStatus, {
  name: 'ContestStatus',
  description: 'Contest Status',
});

export type PaginateContestParams = {
  skip?: number;
  take?: number;
  cursor?: Prisma.ContestWhereUniqueInput;
  where?: Prisma.ContestWhereInput;
  orderBy?: Prisma.ContestOrderByWithRelationInput;
  include?: {
    questions?: boolean;
    topics?: boolean;
    answers?: boolean;
  };
};

@ObjectType()
export class TeacherDashboardResponse {
  @Field(() => Int)
  meTotal: number;

  @Field(() => Int)
  total: number;
}
