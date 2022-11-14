/*
  Warnings:

  - You are about to drop the `MemberShip` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Role` DROP FOREIGN KEY `Role_memberShipId_fkey`;

-- DropForeignKey
ALTER TABLE `Subscription` DROP FOREIGN KEY `Subscription_memberShipId_fkey`;

-- DropIndex
DROP INDEX `Profile_firstName_idx` ON `Profile`;

-- DropIndex
DROP INDEX `Profile_level_idx` ON `Profile`;

-- DropIndex
DROP INDEX `User_emailConfirmed_idx` ON `User`;

-- DropTable
DROP TABLE `MemberShip`;

-- CreateTable
CREATE TABLE `SubscriptionPlans` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `subTitle` VARCHAR(250) NULL DEFAULT '',
    `price` SMALLINT UNSIGNED NOT NULL,
    `allowedContests` SMALLINT UNSIGNED NOT NULL,
    `options` JSON NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SubscriptionPlans_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Profile_firstName_idx` ON `Profile`(`firstName` DESC);

-- CreateIndex
CREATE INDEX `Profile_level_idx` ON `Profile`(`level` DESC);

-- CreateIndex
CREATE INDEX `User_emailConfirmed_idx` ON `User`(`emailConfirmed` DESC);

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_memberShipId_fkey` FOREIGN KEY (`memberShipId`) REFERENCES `SubscriptionPlans`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Role` ADD CONSTRAINT `Role_memberShipId_fkey` FOREIGN KEY (`memberShipId`) REFERENCES `SubscriptionPlans`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
