/*
  Warnings:

  - The primary key for the `ItemSupplier` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `orderHistory` on the `ItemSupplier` table. All the data in the column will be lost.
  - Made the column `expiry` on table `foodItems` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ItemSupplier" DROP CONSTRAINT "ItemSupplier_pkey",
DROP COLUMN "orderHistory",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ItemSupplier_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "foodItems" ALTER COLUMN "expiry" SET NOT NULL;

-- CreateTable
CREATE TABLE "OrderHistory" (
    "id" SERIAL NOT NULL,
    "itemSupplierId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderHistory" ADD CONSTRAINT "OrderHistory_itemSupplierId_fkey" FOREIGN KEY ("itemSupplierId") REFERENCES "ItemSupplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
