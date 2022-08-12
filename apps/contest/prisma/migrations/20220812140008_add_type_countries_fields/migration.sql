/*
  Warnings:

  - You are about to alter the column `level` on the `Contest` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `Json`.
  - You are about to alter the column `startTime` on the `Contest` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `type` to the `Contest` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Contest_authorId_created_idx` ON `Contest`;

-- DropIndex
DROP INDEX `Contest_level_idx` ON `Contest`;

-- DropIndex
DROP INDEX `Contest_title_idx` ON `Contest`;

-- AlterTable
ALTER TABLE `Contest` ADD COLUMN `countries` JSON NULL,
    ADD COLUMN `type` VARCHAR(100) NOT NULL,
    MODIFY `level` JSON NOT NULL,
    MODIFY `startTime` DATETIME NOT NULL;

-- CreateIndex
CREATE INDEX `Contest_title_idx` ON `Contest`(`title`(100) DESC);

-- CreateIndex
CREATE INDEX `Contest_type_idx` ON `Contest`(`type`(100) DESC);

-- CreateIndex
CREATE INDEX `Contest_status_idx` ON `Contest`(`status`(100) DESC);

-- CreateIndex
CREATE INDEX `Contest_authorId_created_idx` ON `Contest`(`authorId`, `created` DESC);
