/*
  Warnings:

  - You are about to alter the column `startTime` on the `Contest` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropIndex
DROP INDEX `Answer_userId_contestId_idx` ON `Answer`;

-- DropIndex
DROP INDEX `Contest_authorId_created_idx` ON `Contest`;

-- DropIndex
DROP INDEX `Contest_status_idx` ON `Contest`;

-- DropIndex
DROP INDEX `Contest_type_idx` ON `Contest`;

-- DropIndex
DROP INDEX `Question_authorId_created_idx` ON `Question`;

-- DropIndex
DROP INDEX `Question_type_idx` ON `Question`;

-- DropIndex
DROP INDEX `Question_usedCount_idx` ON `Question`;

-- AlterTable
ALTER TABLE `Contest` MODIFY `startTime` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `AppConfig` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL DEFAULT 'منصة أولمبياد النحو العربي',
    `description` VARCHAR(255) NULL DEFAULT '',
    `agreement` TEXT NOT NULL,
    `contactEmail` VARCHAR(255) NULL DEFAULT '',
    `telegramUrl` VARCHAR(255) NULL DEFAULT '',
    `twitterUrl` VARCHAR(255) NULL DEFAULT '',
    `facebookUrl` VARCHAR(255) NULL DEFAULT '',
    `instagramUrl` VARCHAR(255) NULL DEFAULT '',
    `playStorUrl` VARCHAR(255) NULL DEFAULT '',
    `appStorUrl` VARCHAR(255) NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Answer_userId_contestId_idx` ON `Answer`(`userId`, `contestId` DESC);

-- CreateIndex
CREATE INDEX `Contest_type_idx` ON `Contest`(`type`(100) DESC);

-- CreateIndex
CREATE INDEX `Contest_status_idx` ON `Contest`(`status`(100) DESC);

-- CreateIndex
CREATE INDEX `Contest_authorId_created_idx` ON `Contest`(`authorId`, `created` DESC);

-- CreateIndex
CREATE INDEX `Question_type_idx` ON `Question`(`type`(100) DESC);

-- CreateIndex
CREATE INDEX `Question_usedCount_idx` ON `Question`(`usedCount` DESC);

-- CreateIndex
CREATE INDEX `Question_authorId_created_idx` ON `Question`(`authorId`, `created` DESC);
