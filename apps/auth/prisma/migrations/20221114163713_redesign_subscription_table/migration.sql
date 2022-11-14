/*
  Warnings:

  - You are about to drop the column `memberShipId` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `memberShipStatus` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the `Subscription` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Role` DROP FOREIGN KEY `Role_memberShipId_fkey`;

-- DropForeignKey
ALTER TABLE `Subscription` DROP FOREIGN KEY `Subscription_memberShipId_fkey`;

-- DropForeignKey
ALTER TABLE `Subscription` DROP FOREIGN KEY `Subscription_profileId_fkey`;

-- DropIndex
DROP INDEX `Profile_firstName_idx` ON `Profile`;

-- DropIndex
DROP INDEX `Profile_level_idx` ON `Profile`;

-- DropIndex
DROP INDEX `User_emailConfirmed_idx` ON `User`;

-- AlterTable
ALTER TABLE `Role` DROP COLUMN `memberShipId`,
    DROP COLUMN `memberShipStatus`;

-- AlterTable
ALTER TABLE `SubscriptionPlans` ADD COLUMN `period` SMALLINT UNSIGNED NULL DEFAULT 0;

-- DropTable
DROP TABLE `Subscription`;

-- CreateTable
CREATE TABLE `Membership` (
    `id` VARCHAR(191) NOT NULL,
    `status` ENUM('ACTIVE', 'CANCELED', 'UNPAID', 'EXPIREDHOL') NOT NULL DEFAULT 'UNPAID',
    `startDate` DATETIME(3) NULL,
    `endDate` DATETIME(3) NULL,
    `renewCount` SMALLINT UNSIGNED NULL DEFAULT 0,
    `profileId` VARCHAR(191) NOT NULL,
    `memberShipId` VARCHAR(191) NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Membership_profileId_key`(`profileId`),
    UNIQUE INDEX `Membership_memberShipId_key`(`memberShipId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Profile_firstName_idx` ON `Profile`(`firstName` DESC);

-- CreateIndex
CREATE INDEX `Profile_level_idx` ON `Profile`(`level` DESC);

-- CreateIndex
CREATE INDEX `User_emailConfirmed_idx` ON `User`(`emailConfirmed` DESC);

-- AddForeignKey
ALTER TABLE `Membership` ADD CONSTRAINT `Membership_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Membership` ADD CONSTRAINT `Membership_memberShipId_fkey` FOREIGN KEY (`memberShipId`) REFERENCES `SubscriptionPlans`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
