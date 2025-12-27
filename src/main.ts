import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { configureApp } from './bootstrap';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  configureApp(app, configService);

  const port = configService.getOrThrow<number>('APP_PORT');
  await app.listen(port);
}
void bootstrap().finally(() => {
  console.log('Bootstrap finished');
});
