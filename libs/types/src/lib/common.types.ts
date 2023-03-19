import { registerEnumType } from '@nestjs/graphql';

export enum StudentLevel {
  Student = 'Student',
  Eighteen = 'Eighteen',
  Fifteen = 'Fifteen',
  Fourteen = 'Fourteen',
  Nineteen = 'Nineteen',
  Seventeen = 'Seventeen',
  Sixteen = 'Sixteen',
  Thirteen = 'Thirteen',
}

registerEnumType(StudentLevel, {
  name: 'StudentLevel',
  description: 'Student Level',
});
