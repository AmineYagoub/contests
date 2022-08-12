import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { Contest } from '@prisma/client';

import { PrismaService } from '../app/prisma.service';
import { ContestLevel, ContestStatus } from '../contests/contest.model';

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
        duration: 40,
        maxParticipants: 0,
        participants: [],
        questionCount: 100,
        published: faker.datatype.boolean(),
        created: faker.date.past(),
        updated: faker.date.past(),
        startTime: faker.date.soon(),
        status: faker.helpers.arrayElement([
          ContestStatus.CLOSED,
          ContestStatus.NOT_STARTED,
          ContestStatus.OPEN,
        ]),
        level: faker.helpers.arrayElement([
          ContestLevel.Thirteen,
          ContestLevel.Fifteen,
          ContestLevel.Sixteen,
          ContestLevel.Seventeen,
        ]),
      };
      cts.push(contest);
    }
    await this.prismaService.contest.createMany({
      data: cts,
    });
  }
}
