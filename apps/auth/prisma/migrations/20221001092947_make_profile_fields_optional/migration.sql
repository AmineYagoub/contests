-- DropIndex
DROP INDEX `Profile_firstName_idx` ON `Profile`;

-- DropIndex
DROP INDEX `Profile_level_idx` ON `Profile`;

-- DropIndex
DROP INDEX `User_emailConfirmed_idx` ON `User`;

-- AlterTable
ALTER TABLE `Profile` MODIFY `firstName` VARCHAR(100) NULL DEFAULT '',
    MODIFY `lastName` VARCHAR(100) NULL DEFAULT '',
    MODIFY `level` CHAR(64) NULL DEFAULT '',
    MODIFY `personalImage` VARCHAR(255) NULL DEFAULT '',
    MODIFY `birthCertImage` VARCHAR(255) NULL DEFAULT '',
    MODIFY `letterImage` VARCHAR(255) NULL DEFAULT '',
    MODIFY `dateOfBirth` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE INDEX `Profile_firstName_idx` ON `Profile`(`firstName` DESC);

-- CreateIndex
CREATE INDEX `Profile_level_idx` ON `Profile`(`level` DESC);

-- CreateIndex
CREATE INDEX `User_emailConfirmed_idx` ON `User`(`emailConfirmed` DESC);
