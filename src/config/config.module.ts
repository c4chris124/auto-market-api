import { ConfigModule } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development.local',
    }),
  ],
  exports: [ConfigModule],
})
export class CoreConfigModule {}
