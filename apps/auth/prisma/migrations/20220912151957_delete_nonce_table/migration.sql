/*
  Warnings:

  - You are about to drop the `NonceToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `NonceToken` DROP FOREIGN KEY `NonceToken_userId_fkey`;

-- DropIndex
DROP INDEX `User_emailConfirmed_idx` ON `User`;

-- DropIndex
DROP INDEX `User_firstName_idx` ON `User`;

-- DropTable
DROP TABLE `NonceToken`;

-- CreateIndex
CREATE INDEX `User_firstName_idx` ON `User`(`firstName`(100) DESC);

-- CreateIndex
CREATE INDEX `User_emailConfirmed_idx` ON `User`(`emailConfirmed` DESC);
