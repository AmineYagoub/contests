/*
  Warnings:

  - You are about to alter the column `startTime` on the `Contest` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropIndex
DROP INDEX `Contest_authorId_created_idx` ON `Contest`;

-- DropIndex
DROP INDEX `Contest_status_idx` ON `Contest`;

-- DropIndex
DROP INDEX `Contest_title_idx` ON `Contest`;

-- DropIndex
DROP INDEX `Contest_type_idx` ON `Contest`;

-- AlterTable
ALTER TABLE `Contest` MODIFY `startTime` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `Question` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(100) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `level` JSON NOT NULL,
    `usedCount` INTEGER UNSIGNED NULL DEFAULT 0,
    `options` JSON NOT NULL,
    `published` BOOLEAN NULL DEFAULT true,
    `authorId` INTEGER UNSIGNED NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Question_title_idx`(`title`(100) DESC),
    INDEX `Question_type_idx`(`type`(100) DESC),
    INDEX `Question_usedCount_idx`(`usedCount` DESC),
    INDEX `Question_authorId_created_idx`(`authorId`, `created` DESC),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContestsOnQuestions` (
    `questionId` INTEGER NOT NULL,
    `contestId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `assignedBy` VARCHAR(191) NULL,

    PRIMARY KEY (`questionId`, `contestId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Contest_title_idx` ON `Contest`(`title`(100) DESC);

-- CreateIndex
CREATE INDEX `Contest_type_idx` ON `Contest`(`type`(100) DESC);

-- CreateIndex
CREATE INDEX `Contest_status_idx` ON `Contest`(`status`(100) DESC);

-- CreateIndex
CREATE INDEX `Contest_authorId_created_idx` ON `Contest`(`authorId`, `created` DESC);

-- AddForeignKey
ALTER TABLE `ContestsOnQuestions` ADD CONSTRAINT `ContestsOnQuestions_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContestsOnQuestions` ADD CONSTRAINT `ContestsOnQuestions_contestId_fkey` FOREIGN KEY (`contestId`) REFERENCES `Contest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
