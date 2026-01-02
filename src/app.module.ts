import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CoreConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { InventoryModule } from './modules/inventory/inventory.module';

@Module({
  imports: [
    CoreConfigModule,
    DatabaseModule,
    AuthModule,
    UserModule,
    InventoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
