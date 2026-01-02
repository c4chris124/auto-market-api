import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { DatabaseService } from '@database/database.service';
import { PrismaRepository } from '@database/prisma/prisma.repository';

@Injectable()
export class InventoryRepository extends PrismaRepository {
  private readonly listSelect = {
    id: true,
    vin: true,
    stockNumber: true,
    year: true,
    trim: true,
    bodyType: true,
    transmission: true,
    mileage: true,
    price: true,
    msrp: true,
    currency: true,
    featured: true,
    certified: true,
    make: {
      select: {
        id: true,
        name: true,
      },
    },
    model: {
      select: {
        id: true,
        name: true,
      },
    },
    media: {
      take: 1,
      orderBy: { sortOrder: 'asc' },
      select: {
        url: true,
      },
    },
  } satisfies Prisma.VehicleSelect;

  constructor(databaseService: DatabaseService) {
    super(databaseService);
  }

  public async search(
    where: Prisma.VehicleWhereInput,
    orderBy: Prisma.VehicleOrderByWithRelationInput,
    skip: number,
    take: number,
  ) {
    const [items, total] = await this.prisma.$transaction([
      this.prisma.vehicle.findMany({
        where,
        orderBy,
        skip,
        take,
        select: this.listSelect,
      }),
      this.prisma.vehicle.count({ where }),
    ]);

    return { items, total };
  }
}
