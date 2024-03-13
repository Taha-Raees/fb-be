/*
  Warnings:

  - You are about to drop the column `category` on the `inventorys` table. All the data in the column will be lost.
  - Added the required column `description` to the `inventorys` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "inventorys" DROP COLUMN "category",
ADD COLUMN     "description" TEXT NOT NULL;
