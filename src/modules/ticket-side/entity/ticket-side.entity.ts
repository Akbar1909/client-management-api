import { Prisma } from '@prisma/client';

export type TicketSideEntity = Prisma.TicketSideCreateInput & { id: number };
