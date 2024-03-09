/*
  Warnings:

  - You are about to drop the column `expiry` on the `inventorys` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `foodItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `inventorys` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "foodItems" ADD COLUMN     "quantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "inventorys" DROP COLUMN "expiry",
ADD COLUMN     "quantity" INTEGER NOT NULL;
