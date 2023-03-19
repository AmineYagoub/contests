/*
  Warnings:

  - You are about to drop the column `viewMessages` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `viewNotification` on the `Profile` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Profile_firstName_idx` ON `Profile`;

-- DropIndex
DROP INDEX `Profile_level_idx` ON `Profile`;

-- DropIndex
DROP INDEX `User_emailConfirmed_idx` ON `User`;

-- AlterTable
ALTER TABLE `Profile` DROP COLUMN `viewMessages`,
    DROP COLUMN `viewNotification`,
    ADD COLUMN `messagesCount` INTEGER NULL DEFAULT 0,
    ADD COLUMN `notificationsCount` INTEGER NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX `Profile_firstName_idx` ON `Profile`(`firstName` DESC);

-- CreateIndex
CREATE INDEX `Profile_level_idx` ON `Profile`(`level` DESC);

-- CreateIndex
CREATE INDEX `User_emailConfirmed_idx` ON `User`(`emailConfirmed` DESC);
