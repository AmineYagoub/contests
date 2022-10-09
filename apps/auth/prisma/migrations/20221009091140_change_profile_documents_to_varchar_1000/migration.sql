-- DropIndex
DROP INDEX `Profile_firstName_idx` ON `Profile`;

-- DropIndex
DROP INDEX `Profile_level_idx` ON `Profile`;

-- DropIndex
DROP INDEX `User_emailConfirmed_idx` ON `User`;

-- AlterTable
ALTER TABLE `Profile` MODIFY `personalImage` VARCHAR(1000) NULL DEFAULT '',
    MODIFY `birthCertImage` VARCHAR(1000) NULL DEFAULT '',
    MODIFY `letterImage` VARCHAR(1000) NULL DEFAULT '',
    ALTER COLUMN `dateOfBirth` DROP DEFAULT;

-- CreateIndex
CREATE INDEX `Profile_firstName_idx` ON `Profile`(`firstName` DESC);

-- CreateIndex
CREATE INDEX `Profile_level_idx` ON `Profile`(`level` DESC);

-- CreateIndex
CREATE INDEX `User_emailConfirmed_idx` ON `User`(`emailConfirmed` DESC);
