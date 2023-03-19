/*
  Warnings:

  - Made the column `agreement` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `User_emailConfirmed_idx` ON `User`;

-- DropIndex
DROP INDEX `User_firstName_idx` ON `User`;

-- AlterTable
ALTER TABLE `User` MODIFY `agreement` BOOLEAN NOT NULL,
    MODIFY `isActive` BOOLEAN NULL DEFAULT true;

-- CreateIndex
CREATE INDEX `User_firstName_idx` ON `User`(`firstName`(100) DESC);

-- CreateIndex
CREATE INDEX `User_emailConfirmed_idx` ON `User`(`emailConfirmed` DESC);
