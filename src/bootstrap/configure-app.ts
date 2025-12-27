import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import {
  configureCors,
  configureSession,
  configureSwagger,
  configureValidation,
  configureVersioning,
} from './index';

export const configureApp = (
  app: INestApplication,
  configService: ConfigService,
): void => {
  configureValidation(app);
  configureCors(app, configService);
  configureVersioning(app);
  configureSwagger(app, configService);
  configureSession(app, configService);
  app.enableShutdownHooks();
};
