import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum MessageType {
  ANNOUNCE = 'ANNOUNCE',
  REQUEST = 'REQUEST',
  MESSAGE = 'MESSAGE',
  REPORT = 'REPORT',
  ALERT = 'ALERT',
  INFO = 'INFO',
}

export enum MessageRecipients {
  ALL,
  TEACHERS,
  GOLDEN_TEACHERS,
  FREE_TEACHERS,
  STUDENTS,
  STUDENTS_TEACHERS,
  FREE_STUDENTS,
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

registerEnumType(MessageRecipients, {
  name: 'MessageRecipients',
  description: 'Message Recipients type',
});

@ObjectType()
export class BatchPayloadResult {
  @Field(() => Int)
  count: number;
}
