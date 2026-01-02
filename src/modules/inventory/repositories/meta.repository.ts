import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@database/database.service';
import { PrismaRepository } from '@database/prisma/prisma.repository';

@Injectable()
export class MetaRepository extends PrismaRepository {
  constructor(databaseService: DatabaseService) {
    super(databaseService);
  }

  public listMakes() {
    return this.prisma.make.findMany({
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
      },
    });
  }

  public listModels(makeId?: string) {
    return this.prisma.model.findMany({
      where: makeId ? { makeId } : undefined,
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        makeId: true,
      },
    });
  }
}
