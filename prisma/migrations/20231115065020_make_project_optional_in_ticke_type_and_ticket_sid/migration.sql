-- AlterTable
ALTER TABLE "TicketSide" ALTER COLUMN "projectId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TicketType" ALTER COLUMN "projectId" DROP NOT NULL;
