import { GraphQLError } from 'graphql';

import { registerEnumType } from '@nestjs/graphql';

export enum StudentLevel {
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

export type GatewayGraphQLError = {
  extensions: {
    exception: {
      status: number;
      message: string;
    };
    response: {
      status: number;
      statusText: string;
      body: {
        errors: { extensions: object; message: string }[];
      };
    };
  };
} & GraphQLError;
