import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { parseAllowedOrigins } from '@libs/utils/parse-allowed-origins.util';

export const configureCors = (
  app: INestApplication,
  configService: ConfigService,
): void => {
  const allowedOrigins = parseAllowedOrigins(
    configService.getOrThrow<string>('ALLOWED_ORIGIN'),
  );

  app.enableCors({
    credentials: true,
    exposedHeaders: ['Set-Cookie'],
    origin: allowedOrigins,
    allowedHeaders: ['Content-Type', 'Origin', 'Accept', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  });
};
