import { Directive, Field, ObjectType } from '@nestjs/graphql';

import { BaseProfile } from './base.model';
import { Student } from './student.model';

@ObjectType()
@Directive('@key(fields: "id")')
export class Teacher extends BaseProfile {
  @Field(() => [Student], {
    description: 'Identifies a List of students affiliated with this teacher.',
    nullable: true,
    defaultValue: [],
  })
  students?: Student[];
}

/*   
  @Field({ middleware: [checkRoleMiddleware] })
  @Extensions({ role: Role.ADMIN })
  users: premium teacher users
  
  */
