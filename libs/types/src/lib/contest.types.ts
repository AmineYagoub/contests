import { registerEnumType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

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
    tags?: boolean;
  };
};
