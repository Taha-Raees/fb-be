/*
  Warnings:

  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `status` on the `Order` table. All the data in the column will be lost.
  - Added the required column `change` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `items` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `received` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP CONSTRAINT "Order_pkey",
DROP COLUMN "status",
ADD COLUMN     "change" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "items" JSONB NOT NULL,
ADD COLUMN     "received" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Order_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Order_id_seq";
