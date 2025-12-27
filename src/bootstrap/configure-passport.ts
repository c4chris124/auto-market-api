import { INestApplication } from '@nestjs/common';
import passport from 'passport';

export const configurePassport = (app: INestApplication): void => {
  app.use(passport.initialize());
};
