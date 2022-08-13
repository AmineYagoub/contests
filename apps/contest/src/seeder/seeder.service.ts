import { ContestStatus, ContestType, StudentLevel } from '@contests/types';
import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { Contest } from '@prisma/client';

import { PrismaService } from '../app/prisma.service';

@Injectable()
export class SeederService {
  constructor(private readonly prismaService: PrismaService) {}

  async seedContest() {
    await this.prismaService.contest.deleteMany({});
    const cts = [];
    for (let index = 5; index < 110; index++) {
      const contest: Contest = {
        id: faker.datatype.number(),
        title: `المسابقة رقم ${index}`,
        authorId: faker.datatype.number(),
        type: faker.helpers.arrayElement(Object.values(ContestType)),
        duration: 40,
        maxParticipants: 0,
        participants: [],
        countries: [],
        questionCount: 100,
        published: faker.datatype.boolean(),
        created: faker.date.past(),
        updated: faker.date.past(),
        startTime: faker.date.soon(),
        status: faker.helpers.arrayElement(Object.values(ContestStatus)),
        level: faker.helpers.arrayElements(Object.values(StudentLevel)),
      };
      cts.push(contest);
    }
    await this.prismaService.contest.createMany({
      data: cts,
    });
  }
}
