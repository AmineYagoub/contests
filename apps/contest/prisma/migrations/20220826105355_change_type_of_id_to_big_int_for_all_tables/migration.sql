/*
  Warnings:

  - The primary key for the `Contest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `startTime` on the `Contest` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - The primary key for the `ContestsOnQuestions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `ContestsOnQuestions` DROP FOREIGN KEY `ContestsOnQuestions_contestId_fkey`;

-- DropForeignKey
ALTER TABLE `ContestsOnQuestions` DROP FOREIGN KEY `ContestsOnQuestions_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `_ContestToTag` DROP FOREIGN KEY `_ContestToTag_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ContestToTag` DROP FOREIGN KEY `_ContestToTag_B_fkey`;

-- DropForeignKey
ALTER TABLE `_QuestionToTag` DROP FOREIGN KEY `_QuestionToTag_A_fkey`;

-- DropForeignKey
ALTER TABLE `_QuestionToTag` DROP FOREIGN KEY `_QuestionToTag_B_fkey`;

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
ALTER TABLE `Contest` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    MODIFY `startTime` DATETIME NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `ContestsOnQuestions` DROP PRIMARY KEY,
    MODIFY `questionId` BIGINT NOT NULL,
    MODIFY `contestId` BIGINT NOT NULL,
    ADD PRIMARY KEY (`questionId`, `contestId`);

-- AlterTable
ALTER TABLE `Question` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Tag` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `_ContestToTag` MODIFY `A` BIGINT NOT NULL,
    MODIFY `B` BIGINT NOT NULL;

-- AlterTable
ALTER TABLE `_QuestionToTag` MODIFY `A` BIGINT NOT NULL,
    MODIFY `B` BIGINT NOT NULL;

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
ALTER TABLE `ContestsOnQuestions` ADD CONSTRAINT `ContestsOnQuestions_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContestsOnQuestions` ADD CONSTRAINT `ContestsOnQuestions_contestId_fkey` FOREIGN KEY (`contestId`) REFERENCES `Contest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContestToTag` ADD CONSTRAINT `_ContestToTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `Contest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContestToTag` ADD CONSTRAINT `_ContestToTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_QuestionToTag` ADD CONSTRAINT `_QuestionToTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_QuestionToTag` ADD CONSTRAINT `_QuestionToTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
