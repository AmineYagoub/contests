/*
  Warnings:

  - You are about to drop the column `questionCount` on the `Contest` table. All the data in the column will be lost.
  - You are about to alter the column `startTime` on the `Contest` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `easyQuestionCount` to the `Contest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hardQuestionCount` to the `Contest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediumQuestionCount` to the `Contest` table without a default value. This is not possible if the table is not empty.

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
ALTER TABLE `Contest` DROP COLUMN `questionCount`,
    ADD COLUMN `easyQuestionCount` INTEGER UNSIGNED NOT NULL,
    ADD COLUMN `hardQuestionCount` INTEGER UNSIGNED NOT NULL,
    ADD COLUMN `mediumQuestionCount` INTEGER UNSIGNED NOT NULL,
    MODIFY `startTime` DATETIME NOT NULL;

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
