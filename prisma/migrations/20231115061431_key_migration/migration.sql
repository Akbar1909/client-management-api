/*
  Warnings:

  - You are about to drop the column `nameRu` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `nameUz` on the `Role` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Role" DROP COLUMN "nameRu",
DROP COLUMN "nameUz";
