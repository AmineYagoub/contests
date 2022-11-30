/*
  Warnings:

  - You are about to alter the column `startTime` on the `Contest` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `authorId` on the `Contest` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `VarChar(255)`.
  - You are about to alter the column `authorId` on the `Question` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `VarChar(255)`.

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
ALTER TABLE `Contest` MODIFY `startTime` DATETIME NOT NULL,
    MODIFY `authorId` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Question` MODIFY `authorId` VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE `Message` (
    `id` VARCHAR(191) NOT NULL,
    `content` TINYTEXT NOT NULL,
    `sendToAll` BOOLEAN NULL DEFAULT false,
    `published` BOOLEAN NULL DEFAULT true,
    `authorId` VARCHAR(255) NOT NULL,
    `recipientId` VARCHAR(255) NOT NULL,
    `viewed` BOOLEAN NULL DEFAULT false,
    `viewers` JSON NOT NULL,
    `type` ENUM('ANNOUNCE', 'MESSAGE', 'REPORT', 'ALERT', 'INFO') NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3) NOT NULL,

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
