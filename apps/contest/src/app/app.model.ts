import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class App {
  @Field(() => ID)
  id: string;

  @Field({
    description: 'Identifies the App title.',
  })
  title: string;

  @Field({
    description: 'Identifies the description of App.',
  })
  description: string;

  @Field({
    description: 'Identifies the user agreement content.',
  })
  agreement: string;

  @Field({
    description:
      'Identifies the email used to receive messages from contactUs page.',
  })
  contactEmail: string;

  @Field({
    description: 'Identifies telegram url.',
  })
  telegramUrl: string;

  @Field({
    description: 'Identifies twitter url.',
  })
  twitterUrl: string;

  @Field({
    description: 'Identifies facebook url.',
  })
  facebookUrl: string;

  @Field({
    description: 'Identifies instagram url.',
  })
  instagramUrl?: string;

  @Field({
    description: 'Identifies the android app url in google play.',
  })
  playStorUrl: string;

  @Field({
    description: 'Identifies the iphone app url in AppStore.',
  })
  appStorUrl: string;
}
