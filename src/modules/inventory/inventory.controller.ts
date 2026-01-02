import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { InventoryService } from './inventory.service';
import {
  InventoryListResponseDto,
  InventoryQueryDto,
} from './dto/inventory.dto';

@ApiTags('Inventory')
@Controller({ path: 'inventory', version: '1' })
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  @ApiOkResponse({ type: InventoryListResponseDto })
  public async listInventory(
    @Query() query: InventoryQueryDto,
  ): Promise<InventoryListResponseDto> {
    return this.inventoryService.listInventory(query);
  }
}
