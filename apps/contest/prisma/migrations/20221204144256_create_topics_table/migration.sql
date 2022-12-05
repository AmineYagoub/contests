/*
  Warnings:

  - You are about to alter the column `startTime` on the `Contest` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ContestToTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_QuestionToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_ContestToTag` DROP FOREIGN KEY `_ContestToTag_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ContestToTag` DROP FOREIGN KEY `_ContestToTag_B_fkey`;

-- DropForeignKey
ALTER TABLE `_QuestionToTag` DROP FOREIGN KEY `_QuestionToTag_A_fkey`;

-- DropForeignKey
ALTER TABLE `_QuestionToTag` DROP FOREIGN KEY `_QuestionToTag_B_fkey`;

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

-- DropTable
DROP TABLE `Tag`;

-- DropTable
DROP TABLE `_ContestToTag`;

-- DropTable
DROP TABLE `_QuestionToTag`;

-- CreateTable
CREATE TABLE `Topic` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `level` ENUM('Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen') NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Topic_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ContestToTopic` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ContestToTopic_AB_unique`(`A`, `B`),
    INDEX `_ContestToTopic_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_QuestionToTopic` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_QuestionToTopic_AB_unique`(`A`, `B`),
    INDEX `_QuestionToTopic_B_index`(`B`)
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

-- AddForeignKey
ALTER TABLE `_ContestToTopic` ADD CONSTRAINT `_ContestToTopic_A_fkey` FOREIGN KEY (`A`) REFERENCES `Contest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContestToTopic` ADD CONSTRAINT `_ContestToTopic_B_fkey` FOREIGN KEY (`B`) REFERENCES `Topic`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_QuestionToTopic` ADD CONSTRAINT `_QuestionToTopic_A_fkey` FOREIGN KEY (`A`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_QuestionToTopic` ADD CONSTRAINT `_QuestionToTopic_B_fkey` FOREIGN KEY (`B`) REFERENCES `Topic`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
