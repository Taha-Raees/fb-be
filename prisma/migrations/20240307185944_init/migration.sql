/*
  Warnings:

  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventParticipants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProjectParticipants` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_senderId_fkey";

-- DropForeignKey
ALTER TABLE "_EventParticipants" DROP CONSTRAINT "_EventParticipants_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventParticipants" DROP CONSTRAINT "_EventParticipants_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectParticipants" DROP CONSTRAINT "_ProjectParticipants_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectParticipants" DROP CONSTRAINT "_ProjectParticipants_B_fkey";

-- DropTable
DROP TABLE "Event";

-- DropTable
DROP TABLE "Message";

-- DropTable
DROP TABLE "Project";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "_EventParticipants";

-- DropTable
DROP TABLE "_ProjectParticipants";

-- DropEnum
DROP TYPE "Role";
