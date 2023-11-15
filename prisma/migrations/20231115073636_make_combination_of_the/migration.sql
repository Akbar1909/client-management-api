/*
  Warnings:

  - A unique constraint covering the columns `[projectId,name]` on the table `ClientStatus` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,projectId]` on the table `TicketSide` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,projectId]` on the table `TicketType` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ClientStatus_name_key";

-- DropIndex
DROP INDEX "TicketSide_name_key";

-- DropIndex
DROP INDEX "TicketType_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "ClientStatus_projectId_name_key" ON "ClientStatus"("projectId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "TicketSide_name_projectId_key" ON "TicketSide"("name", "projectId");

-- CreateIndex
CREATE UNIQUE INDEX "TicketType_name_projectId_key" ON "TicketType"("name", "projectId");
