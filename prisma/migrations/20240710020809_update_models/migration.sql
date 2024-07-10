/*
  Warnings:

  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_posSystemId_fkey";

-- DropTable
DROP TABLE "Order";

-- CreateTable
CREATE TABLE "EventPosOrders" (
    "id" SERIAL NOT NULL,
    "ordersData" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventPosOrders_pkey" PRIMARY KEY ("id")
);
