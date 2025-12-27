import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  SWAGGER_DARK_CSS,
  SWAGGER_META,
} from '@common/constants/swagger.constants';

export const configureSwagger = (
  app: INestApplication,
  configService: ConfigService,
): void => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle(SWAGGER_META.title)
    .setDescription(SWAGGER_META.description)
    .setVersion(SWAGGER_META.version)
    .addCookieAuth(configService.getOrThrow<string>('SESSION_NAME'))
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('docs', app, swaggerDocument, {
    customSiteTitle: SWAGGER_META.title,
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  SwaggerModule.setup('docs-dark', app, swaggerDocument, {
    customSiteTitle: `${SWAGGER_META.title} (Dark)`,
    customCss: SWAGGER_DARK_CSS,
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
};
