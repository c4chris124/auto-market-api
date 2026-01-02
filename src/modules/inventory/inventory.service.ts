import { Injectable } from '@nestjs/common';

import { InventoryRepository } from './repositories/inventory.repository';
import {
  InventoryListResponseDto,
  InventoryQueryDto,
} from './dto/inventory.dto';
import {
  buildInventoryWhere,
  normalizePagination,
  resolveInventoryOrderBy,
} from './utils/inventory.utils';

@Injectable()
export class InventoryService {
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  public async listInventory(
    query: InventoryQueryDto,
  ): Promise<InventoryListResponseDto> {
    const { page, limit, skip } = normalizePagination(query.page, query.limit);

    const where = buildInventoryWhere(query);
    const orderBy = resolveInventoryOrderBy(query.sort);

    const { items, total } = await this.inventoryRepository.search(
      where,
      orderBy,
      skip,
      limit,
    );

    const mappedItems = items.map(({ media, ...vehicle }) => ({
      ...vehicle,
      coverImageUrl: media?.[0]?.url ?? null,
    }));

    return {
      items: mappedItems,
      page,
      limit,
      total,
      hasNext: page * limit < total,
      hasPrev: page > 1,
    };
  }
}
