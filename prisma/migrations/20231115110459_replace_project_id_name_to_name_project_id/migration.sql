/*
  Warnings:

  - A unique constraint covering the columns `[name,projectId]` on the table `ClientStatus` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ClientStatus_projectId_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "ClientStatus_name_projectId_key" ON "ClientStatus"("name", "projectId");
