/*
  Warnings:

  - You are about to drop the column `options` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `subTitle` on the `Subscription` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[profileId]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[memberShipId]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `memberShipId` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Subscription` DROP FOREIGN KEY `Subscription_roleId_fkey`;

-- DropIndex
DROP INDEX `Profile_firstName_idx` ON `Profile`;

-- DropIndex
DROP INDEX `Profile_level_idx` ON `Profile`;

-- DropIndex
DROP INDEX `User_emailConfirmed_idx` ON `User`;

-- AlterTable
ALTER TABLE `Role` ADD COLUMN `memberShipId` VARCHAR(191) NULL,
    ADD COLUMN `memberShipStatus` BOOLEAN NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Subscription` DROP COLUMN `options`,
    DROP COLUMN `price`,
    DROP COLUMN `roleId`,
    DROP COLUMN `subTitle`,
    ADD COLUMN `memberShipId` VARCHAR(191) NOT NULL,
    ADD COLUMN `profileId` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` VARCHAR(250) NOT NULL;

-- CreateTable
CREATE TABLE `MemberShip` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `subTitle` VARCHAR(250) NOT NULL,
    `price` SMALLINT UNSIGNED NOT NULL,
    `contestCount` SMALLINT UNSIGNED NOT NULL,
    `options` JSON NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3) NOT NULL,

    UNIQUE INDEX `MemberShip_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Profile_firstName_idx` ON `Profile`(`firstName` DESC);

-- CreateIndex
CREATE INDEX `Profile_level_idx` ON `Profile`(`level` DESC);

-- CreateIndex
CREATE UNIQUE INDEX `Subscription_profileId_key` ON `Subscription`(`profileId`);

-- CreateIndex
CREATE UNIQUE INDEX `Subscription_memberShipId_key` ON `Subscription`(`memberShipId`);

-- CreateIndex
CREATE INDEX `User_emailConfirmed_idx` ON `User`(`emailConfirmed` DESC);

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_memberShipId_fkey` FOREIGN KEY (`memberShipId`) REFERENCES `MemberShip`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Role` ADD CONSTRAINT `Role_memberShipId_fkey` FOREIGN KEY (`memberShipId`) REFERENCES `MemberShip`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
