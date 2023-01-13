import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prisma } from '@prisma/contest-service';

export enum ContestStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  NOT_STARTED = 'NOT_STARTED',
}

export enum ContestType {
  REGIONAL = 'REGIONAL',
  CENTRALIZED = 'CENTRALIZED',
  WORLDWIDE = 'WORLDWIDE',
}

registerEnumType(ContestStatus, {
  name: 'ContestStatus',
  description: 'Contest Status',
});

registerEnumType(ContestType, {
  name: 'ContestType',
  description: 'Contest Type',
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
  };
};

@ObjectType()
export class TeacherDashboardResponse {
  @Field(() => Int)
  meTotal: number;

  @Field(() => Int)
  total: number;
}
