import { Prisma, VehicleStatus } from '@prisma/client';

import { InventoryQueryDto, InventorySort } from '../dto/inventory.dto';

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const isUuid = (value: string) => UUID_REGEX.test(value);

export const normalizePagination = (page?: number, limit?: number) => {
  const safePage = page && page > 0 ? page : 1;
  const safeLimit = limit && limit > 0 ? Math.min(limit, 100) : 12;
  return {
    page: safePage,
    limit: safeLimit,
    skip: (safePage - 1) * safeLimit,
  };
};

export const buildInventoryWhere = (
  query: InventoryQueryDto,
): Prisma.VehicleWhereInput => {
  const where: Prisma.VehicleWhereInput = {
    status: VehicleStatus.AVAILABLE,
  };

  if (query.certified !== undefined) {
    where.certified = query.certified;
  }

  if (query.featured !== undefined) {
    where.featured = query.featured;
  }

  if (query.bodyType) {
    where.bodyType = query.bodyType;
  }

  if (query.transmission) {
    where.transmission = query.transmission;
  }

  if (query.priceMin !== undefined || query.priceMax !== undefined) {
    where.price = {};
    if (query.priceMin !== undefined) {
      where.price.gte = query.priceMin;
    }
    if (query.priceMax !== undefined) {
      where.price.lte = query.priceMax;
    }
  }

  if (query.yearMin !== undefined || query.yearMax !== undefined) {
    where.year = {};
    if (query.yearMin !== undefined) {
      where.year.gte = query.yearMin;
    }
    if (query.yearMax !== undefined) {
      where.year.lte = query.yearMax;
    }
  }

  if (query.make) {
    if (isUuid(query.make)) {
      where.makeId = query.make;
    } else {
      where.make = {
        name: {
          contains: query.make,
          mode: 'insensitive',
        },
      };
    }
  }

  if (query.model) {
    if (isUuid(query.model)) {
      where.modelId = query.model;
    } else {
      where.model = {
        name: {
          contains: query.model,
          mode: 'insensitive',
        },
      };
    }
  }

  if (query.q) {
    const search = query.q.trim();
    if (search.length) {
      where.OR = [
        { vin: { contains: search, mode: 'insensitive' } },
        { stockNumber: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { trim: { contains: search, mode: 'insensitive' } },
        { exteriorColor: { contains: search, mode: 'insensitive' } },
        { interiorColor: { contains: search, mode: 'insensitive' } },
        { make: { name: { contains: search, mode: 'insensitive' } } },
        { model: { name: { contains: search, mode: 'insensitive' } } },
      ];
    }
  }

  return where;
};

export const resolveInventoryOrderBy = (
  sort?: InventorySort,
): Prisma.VehicleOrderByWithRelationInput => {
  switch (sort) {
    case InventorySort.PRICE_ASC:
      return { price: 'asc' };
    case InventorySort.PRICE_DESC:
      return { price: 'desc' };
    case InventorySort.YEAR_ASC:
      return { year: 'asc' };
    case InventorySort.YEAR_DESC:
      return { year: 'desc' };
    case InventorySort.MILEAGE_ASC:
      return { mileage: 'asc' };
    case InventorySort.MILEAGE_DESC:
      return { mileage: 'desc' };
    case InventorySort.OLDEST:
      return { createdAt: 'asc' };
    case InventorySort.NEWEST:
    default:
      return { createdAt: 'desc' };
  }
};
