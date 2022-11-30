import { User } from '../users/user.entity';
import { MessageType } from '@contests/types';
import { BaseModel } from '../common/base.model';
import { Field, ObjectType, Directive, HideField } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class Message extends BaseModel {
  @Field({
    description: 'Identifies the content of the message.',
  })
  content: string;

  @Field(() => User, {
    description: 'Identifies the recipient id.',
    nullable: true,
  })
  recipientId?: string;

  @Field({
    description: 'Identifies if this message viewed by recipient.',
    nullable: true,
  })
  viewed?: boolean;

  @Field({
    description: 'Identifies if this message will be viewed by all users.',
    nullable: true,
  })
  sendToAll?: boolean;

  @HideField()
  viewers?: string[];

  @Field(() => MessageType, {
    description: 'Identifies the type of the Message',
  })
  type: MessageType;
}
