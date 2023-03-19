/*
  Warnings:

  - You are about to drop the column `isSucceed` on the `EmailToken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `EmailToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated` to the `EmailToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_emailConfirmed_idx` ON `User`;

-- DropIndex
DROP INDEX `User_firstName_idx` ON `User`;

-- AlterTable
ALTER TABLE `EmailToken` DROP COLUMN `isSucceed`,
    ADD COLUMN `updated` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `EmailToken_userId_key` ON `EmailToken`(`userId`);

-- CreateIndex
CREATE INDEX `User_firstName_idx` ON `User`(`firstName`(100) DESC);

-- CreateIndex
CREATE INDEX `User_emailConfirmed_idx` ON `User`(`emailConfirmed` DESC);
