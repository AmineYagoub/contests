import { topics } from '@contests/utils';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../app/prisma.service';

@Injectable()
export class SeedService {
  constructor(private prisma: PrismaService) {}

  /**
   * Seed Topics
   */
  private async seedTopics() {
    for (const t of topics) {
      await this.prisma.topic.create({
        data: {
          title: t.title,
          level: t.level,
        },
      });
    }
  }

  async seedCts() {
    await this.prisma.topic.deleteMany();
    await this.prisma.question.deleteMany();
    await this.seedTopics();
  }
}
