import { Role } from '@prisma/client';

export type SessionUser = {
  id: string;
  email: string;
  role: Role;
};
