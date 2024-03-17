/*
  Warnings:

  - You are about to drop the `Card` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Stage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cost` to the `foodItems` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_stageId_fkey";

-- AlterTable
ALTER TABLE "foodItems" ADD COLUMN     "cost" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "Card";

-- DropTable
DROP TABLE "Stage";

-- CreateTable
CREATE TABLE "Supplier" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemSupplier" (
    "itemId" INTEGER NOT NULL,
    "supplierId" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "orderHistory" TEXT,

    CONSTRAINT "ItemSupplier_pkey" PRIMARY KEY ("itemId","supplierId")
);

-- AddForeignKey
ALTER TABLE "ItemSupplier" ADD CONSTRAINT "ItemSupplier_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "foodItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemSupplier" ADD CONSTRAINT "ItemSupplier_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
