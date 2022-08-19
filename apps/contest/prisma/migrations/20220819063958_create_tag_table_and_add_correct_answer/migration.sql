/*
  Warnings:

  - You are about to alter the column `startTime` on the `Contest` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `correctAnswer` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
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

-- AlterTable
ALTER TABLE `Question` ADD COLUMN `correctAnswer` VARCHAR(255) NOT NULL,
    ADD COLUMN `lesson` VARCHAR(255) NULL DEFAULT '';

-- CreateTable
CREATE TABLE `Tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Tag_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ContestToTag` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ContestToTag_AB_unique`(`A`, `B`),
    INDEX `_ContestToTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_QuestionToTag` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_QuestionToTag_AB_unique`(`A`, `B`),
    INDEX `_QuestionToTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
ALTER TABLE `_ContestToTag` ADD CONSTRAINT `_ContestToTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `Contest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContestToTag` ADD CONSTRAINT `_ContestToTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_QuestionToTag` ADD CONSTRAINT `_QuestionToTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_QuestionToTag` ADD CONSTRAINT `_QuestionToTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
