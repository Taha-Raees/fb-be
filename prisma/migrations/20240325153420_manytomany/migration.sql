-- CreateTable
CREATE TABLE "_EventFoodTrucks" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_EventEquipment" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_EventFoodItems" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EventFoodTrucks_AB_unique" ON "_EventFoodTrucks"("A", "B");

-- CreateIndex
CREATE INDEX "_EventFoodTrucks_B_index" ON "_EventFoodTrucks"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventEquipment_AB_unique" ON "_EventEquipment"("A", "B");

-- CreateIndex
CREATE INDEX "_EventEquipment_B_index" ON "_EventEquipment"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventFoodItems_AB_unique" ON "_EventFoodItems"("A", "B");

-- CreateIndex
CREATE INDEX "_EventFoodItems_B_index" ON "_EventFoodItems"("B");

-- AddForeignKey
ALTER TABLE "_EventFoodTrucks" ADD CONSTRAINT "_EventFoodTrucks_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventFoodTrucks" ADD CONSTRAINT "_EventFoodTrucks_B_fkey" FOREIGN KEY ("B") REFERENCES "foodtrucks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventEquipment" ADD CONSTRAINT "_EventEquipment_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventEquipment" ADD CONSTRAINT "_EventEquipment_B_fkey" FOREIGN KEY ("B") REFERENCES "inventorys"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventFoodItems" ADD CONSTRAINT "_EventFoodItems_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventFoodItems" ADD CONSTRAINT "_EventFoodItems_B_fkey" FOREIGN KEY ("B") REFERENCES "foodItems"("id") ON DELETE CASCADE ON UPDATE CASCADE;
