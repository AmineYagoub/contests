/*
  Warnings:

  - The values [EXPIREDHOL] on the enum `Membership_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- DropIndex
DROP INDEX `Profile_firstName_idx` ON `Profile`;

-- DropIndex
DROP INDEX `Profile_level_idx` ON `Profile`;

-- DropIndex
DROP INDEX `User_emailConfirmed_idx` ON `User`;

-- AlterTable
ALTER TABLE `Membership` MODIFY `status` ENUM('ACTIVE', 'CANCELED', 'UNPAID', 'EXPIRED') NOT NULL DEFAULT 'UNPAID';

-- CreateIndex
CREATE INDEX `Profile_firstName_idx` ON `Profile`(`firstName` DESC);

-- CreateIndex
CREATE INDEX `Profile_level_idx` ON `Profile`(`level` DESC);

-- CreateIndex
CREATE INDEX `User_emailConfirmed_idx` ON `User`(`emailConfirmed` DESC);
