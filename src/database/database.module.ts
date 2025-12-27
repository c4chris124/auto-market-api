import { Global, Module } from '@nestjs/common';

import { DatabaseService } from './database.service';
import { PrismaDatabaseService } from './prisma/prisma.service';

@Global()
@Module({
  providers: [
    PrismaDatabaseService,
    {
      provide: DatabaseService,
      useExisting: PrismaDatabaseService,
    },
  ],
  exports: [DatabaseService],
})
export class DatabaseModule {}
