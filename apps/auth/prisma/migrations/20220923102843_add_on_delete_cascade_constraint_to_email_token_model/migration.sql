-- DropForeignKey
ALTER TABLE `EmailToken` DROP FOREIGN KEY `EmailToken_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Permission` DROP FOREIGN KEY `Permission_roleId_fkey`;

-- DropIndex
DROP INDEX `User_emailConfirmed_idx` ON `User`;

-- DropIndex
DROP INDEX `User_firstName_idx` ON `User`;

-- CreateIndex
CREATE INDEX `User_firstName_idx` ON `User`(`firstName`(100) DESC);

-- CreateIndex
CREATE INDEX `User_emailConfirmed_idx` ON `User`(`emailConfirmed` DESC);

-- AddForeignKey
ALTER TABLE `Permission` ADD CONSTRAINT `Permission_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmailToken` ADD CONSTRAINT `EmailToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
