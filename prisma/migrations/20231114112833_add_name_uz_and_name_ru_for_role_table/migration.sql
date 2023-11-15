/*
  Warnings:

  - A unique constraint covering the columns `[nameUz]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nameRu]` on the table `Role` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Role" ADD COLUMN "nameRu" TEXT NOT NULL DEFAULT '',
ADD COLUMN "nameUz" TEXT NOT NULL DEFAULT '';


