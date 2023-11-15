import { Prisma } from '@prisma/client';
export type TicketTypeEntity = Prisma.TicketTypeCreateInput & {
    id: number;
};
