-- DropIndex
DROP INDEX `User_emailConfirmed_idx` ON `User`;

-- DropIndex
DROP INDEX `User_firstName_idx` ON `User`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `teacherId` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `User_firstName_idx` ON `User`(`firstName`(100) DESC);

-- CreateIndex
CREATE INDEX `User_emailConfirmed_idx` ON `User`(`emailConfirmed` DESC);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
