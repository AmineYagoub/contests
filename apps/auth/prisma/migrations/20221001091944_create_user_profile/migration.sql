/*
  Warnings:

  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_teacherId_fkey`;

-- DropIndex
DROP INDEX `User_emailConfirmed_idx` ON `User`;

-- DropIndex
DROP INDEX `User_firstName_idx` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `firstName`,
    DROP COLUMN `image`,
    DROP COLUMN `lastName`,
    DROP COLUMN `teacherId`;

-- CreateTable
CREATE TABLE `Profile` (
    `id` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(100) NOT NULL,
    `lastName` VARCHAR(100) NOT NULL,
    `level` CHAR(64) NOT NULL,
    `personalImage` VARCHAR(255) NOT NULL,
    `birthCertImage` VARCHAR(255) NOT NULL,
    `letterImage` VARCHAR(255) NOT NULL,
    `dateOfBirth` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `teacherId` VARCHAR(191) NULL,

    UNIQUE INDEX `Profile_userId_key`(`userId`),
    INDEX `Profile_firstName_idx`(`firstName` DESC),
    INDEX `Profile_level_idx`(`level` DESC),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `User_emailConfirmed_idx` ON `User`(`emailConfirmed` DESC);

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `Profile`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
