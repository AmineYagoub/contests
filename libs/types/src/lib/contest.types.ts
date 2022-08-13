import { registerEnumType } from '@nestjs/graphql';

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
