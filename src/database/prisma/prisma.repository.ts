import { PrismaClient } from '@prisma/client';
import { DatabaseService } from '@database/database.service';

export abstract class PrismaRepository {
  protected readonly prismaClient: PrismaClient;

  protected constructor(databaseService: DatabaseService) {
    this.prismaClient = databaseService.getClient<PrismaClient>();
  }

  protected get prisma(): PrismaClient {
    return this.prismaClient;
  }
}
