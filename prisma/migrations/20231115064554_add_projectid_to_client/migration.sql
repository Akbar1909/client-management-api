/*
  Warnings:

  - You are about to drop the column `clientId` on the `Project` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[projectId]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_clientId_fkey";

-- DropIndex
DROP INDEX "Project_clientId_key";

-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "projectId" INTEGER;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "clientId";

-- CreateIndex
CREATE UNIQUE INDEX "Client_projectId_key" ON "Client"("projectId");

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("projectId") ON DELETE CASCADE ON UPDATE CASCADE;
