import 'express-session';
import { SessionUser } from '../common/types/session-user.type';

declare module 'express-session' {
  interface SessionData {
    user?: SessionUser;
  }
}
