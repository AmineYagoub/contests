/*
  Warnings:

  - You are about to alter the column `allowedContests` on the `SubscriptionPlans` table. The data in that column could be lost. The data in that column will be cast from `UnsignedSmallInt` to `SmallInt`.
  - You are about to alter the column `period` on the `SubscriptionPlans` table. The data in that column could be lost. The data in that column will be cast from `UnsignedSmallInt` to `SmallInt`.

*/
-- DropIndex
DROP INDEX `Profile_firstName_idx` ON `Profile`;

-- DropIndex
DROP INDEX `Profile_level_idx` ON `Profile`;

-- DropIndex
DROP INDEX `User_emailConfirmed_idx` ON `User`;

-- AlterTable
ALTER TABLE `Membership` MODIFY `profileId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `SubscriptionPlans` MODIFY `allowedContests` SMALLINT NULL,
    MODIFY `period` SMALLINT NULL;

-- CreateIndex
CREATE INDEX `Profile_firstName_idx` ON `Profile`(`firstName` DESC);

-- CreateIndex
CREATE INDEX `Profile_level_idx` ON `Profile`(`level` DESC);

-- CreateIndex
CREATE INDEX `User_emailConfirmed_idx` ON `User`(`emailConfirmed` DESC);
