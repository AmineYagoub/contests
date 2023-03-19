/*
  Warnings:

  - You are about to drop the column `memberShipId` on the `Membership` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Membership` DROP FOREIGN KEY `Membership_memberShipId_fkey`;

-- DropIndex
DROP INDEX `Profile_firstName_idx` ON `Profile`;

-- DropIndex
DROP INDEX `Profile_level_idx` ON `Profile`;

-- DropIndex
DROP INDEX `User_emailConfirmed_idx` ON `User`;

-- AlterTable
ALTER TABLE `Membership` DROP COLUMN `memberShipId`;

-- CreateTable
CREATE TABLE `_MembershipToSubscriptionPlans` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_MembershipToSubscriptionPlans_AB_unique`(`A`, `B`),
    INDEX `_MembershipToSubscriptionPlans_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Profile_firstName_idx` ON `Profile`(`firstName` DESC);

-- CreateIndex
CREATE INDEX `Profile_level_idx` ON `Profile`(`level` DESC);

-- CreateIndex
CREATE INDEX `User_emailConfirmed_idx` ON `User`(`emailConfirmed` DESC);

-- AddForeignKey
ALTER TABLE `_MembershipToSubscriptionPlans` ADD CONSTRAINT `_MembershipToSubscriptionPlans_A_fkey` FOREIGN KEY (`A`) REFERENCES `Membership`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MembershipToSubscriptionPlans` ADD CONSTRAINT `_MembershipToSubscriptionPlans_B_fkey` FOREIGN KEY (`B`) REFERENCES `SubscriptionPlans`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
