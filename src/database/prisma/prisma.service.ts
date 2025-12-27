import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DatabaseService } from '@database/database.service';

@Injectable()
export class PrismaDatabaseService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy, DatabaseService
{
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }

  getClient<T = PrismaClient>(): T {
    return this as unknown as T;
  }

  async connect(): Promise<void> {
    await this.$connect();
  }

  async disconnect(): Promise<void> {
    await this.$disconnect();
  }
}
