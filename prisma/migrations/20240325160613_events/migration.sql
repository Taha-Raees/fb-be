/*
  Warnings:

  - You are about to drop the `_EventEquipment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventFoodItems` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventFoodTrucks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_EventEquipment" DROP CONSTRAINT "_EventEquipment_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventEquipment" DROP CONSTRAINT "_EventEquipment_B_fkey";

-- DropForeignKey
ALTER TABLE "_EventFoodItems" DROP CONSTRAINT "_EventFoodItems_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventFoodItems" DROP CONSTRAINT "_EventFoodItems_B_fkey";

-- DropForeignKey
ALTER TABLE "_EventFoodTrucks" DROP CONSTRAINT "_EventFoodTrucks_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventFoodTrucks" DROP CONSTRAINT "_EventFoodTrucks_B_fkey";

-- DropTable
DROP TABLE "_EventEquipment";

-- DropTable
DROP TABLE "_EventFoodItems";

-- DropTable
DROP TABLE "_EventFoodTrucks";
