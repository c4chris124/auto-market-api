import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import IORedis from 'ioredis';
import session from 'express-session';
import { RedisStore } from 'connect-redis';
import { parseBoolean } from '@libs/utils/parse-boolean.util';

export const configureSession = (
  app: INestApplication,
  configService: ConfigService,
): void => {
  const redisClient = new IORedis(
    configService.getOrThrow<string>('REDIS_URI'),
  );

  app.use(
    session({
      secret: configService.getOrThrow<string>('SESSION_SECRET'),
      name: configService.getOrThrow<string>('SESSION_NAME'),
      resave: true,
      saveUninitialized: false,
      cookie: {
        domain: configService.getOrThrow<string>('SESSION_DOMAIN'),
        maxAge: Number(configService.getOrThrow<string>('SESSION_MAX_AGE')),
        httpOnly: parseBoolean(
          configService.getOrThrow<string>('SESSION_HTTP_ONLY'),
        ),
        secure: parseBoolean(
          configService.getOrThrow<string>('SESSION_SECURE'),
        ),
        sameSite: configService.getOrThrow<string>('SESSION_SAME_SITE') as
          | 'strict'
          | 'lax'
          | 'none',
      },
      store: new RedisStore({
        client: redisClient,
        prefix: configService.getOrThrow<string>('SESSION_FOLDER'),
      }),
    }),
  );
};
