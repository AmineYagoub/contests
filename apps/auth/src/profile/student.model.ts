import { StudentLevel } from '@contests/types';
import { Directive, Field, ObjectType } from '@nestjs/graphql';

import { BaseProfile } from './base.model';
import { Teacher } from './teacher.model';

@ObjectType()
@Directive('@key(fields: "id")')
export class Student extends BaseProfile {
  @Field(() => StudentLevel, {
    description: 'Identifies student level.',
  })
  level: StudentLevel;

  @Field(() => Teacher, {
    description:
      'Identifies the supervisor teacher associated with that student.',
    nullable: true,
  })
  teacher?: Teacher;

  @Field({
    description: 'Identifies A copy of the birth certificate of the student.',
    nullable: true,
  })
  birthCertImage?: string;

  @Field({
    description:
      'Identifies An official letter approved by the school in which he is studying.',
    nullable: true,
  })
  letterImage?: string;

  @Field({
    description: 'Identifies the date and time when the object was created.',
  })
  dateOfBirth: Date;
}
