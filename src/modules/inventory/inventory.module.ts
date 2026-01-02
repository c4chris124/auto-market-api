import { Module } from '@nestjs/common';

import { MetaService } from './meta.service';
import { VehicleService } from './vehicle.service';
import { MetaController } from './meta.controller';
import { InventoryService } from './inventory.service';
import { VehiclesController } from './vehicles.controller';
import { InventoryController } from './inventory.controller';
import { MetaRepository } from './repositories/meta.repository';
import { VehicleRepository } from './repositories/vehicle.repository';
import { InventoryRepository } from './repositories/inventory.repository';

@Module({
  controllers: [InventoryController, VehiclesController, MetaController],
  providers: [
    InventoryService,
    VehicleService,
    MetaService,
    InventoryRepository,
    VehicleRepository,
    MetaRepository,
  ],
})
export class InventoryModule {}
