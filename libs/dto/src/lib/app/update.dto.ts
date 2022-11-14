import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateAppConfigDto {
  @Field({
    nullable: true,
    description: 'Identifies the App title.',
  })
  title?: string;

  @Field({
    nullable: true,
    description: 'Identifies the description of App.',
  })
  description?: string;

  @Field({
    nullable: true,
    description: 'Identifies the user agreement content.',
  })
  agreement?: string;

  @Field({
    nullable: true,
    description:
      'Identifies the email used to receive messages from contactUs page.',
  })
  contactEmail?: string;

  @Field({
    nullable: true,
    description: 'Identifies telegram url.',
  })
  telegramUrl?: string;

  @Field({
    nullable: true,
    description: 'Identifies twitter url.',
  })
  twitterUrl?: string;

  @Field({
    nullable: true,
    description: 'Identifies facebook url.',
  })
  facebookUrl?: string;

  @Field({
    nullable: true,
    description: 'Identifies instagram url.',
  })
  instagramUrl?: string;

  @Field({
    nullable: true,
    description: 'Identifies the android app url in google play.',
  })
  playStorUrl?: string;

  @Field({
    nullable: true,
    description: 'Identifies the iphone app url in AppStore.',
  })
  appStorUrl?: string;
}
