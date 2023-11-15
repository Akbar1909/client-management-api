import { Prisma } from '@prisma/client';

export type ClientStatusEntity = Prisma.ClientStatusCreateInput & {
  id: number;
};
