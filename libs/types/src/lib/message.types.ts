import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum MessageType {
  ANNOUNCE = 'ANNOUNCE',
  REQUEST = 'REQUEST',
  MESSAGE = 'MESSAGE',
  REPORT = 'REPORT',
  ALERT = 'ALERT',
  INFO = 'INFO',
}

export type PaginationFilter = {
  authorId?: { $in: string[] };
  recipientId?: { $in: string[] };
  sendToAll: boolean;
};

registerEnumType(MessageType, {
  name: 'MessageType',
  description: 'Message type',
});

@ObjectType()
export class BatchPayloadResult {
  @Field(() => Int)
  count: number;
}
