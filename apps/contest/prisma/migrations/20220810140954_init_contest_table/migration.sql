-- CreateTable
CREATE TABLE `Contest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `status` VARCHAR(100) NOT NULL,
    `level` VARCHAR(100) NOT NULL,
    `duration` SMALLINT UNSIGNED NULL DEFAULT 40,
    `startTime` DATETIME NOT NULL,
    `questionCount` INTEGER UNSIGNED NULL DEFAULT 100,
    `maxParticipants` INTEGER UNSIGNED NULL DEFAULT 0,
    `participants` JSON NULL,
    `published` BOOLEAN NULL DEFAULT true,
    `authorId` INTEGER UNSIGNED NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Contest_title_idx`(`title`(100) DESC),
    INDEX `Contest_level_idx`(`level`(100) DESC),
    INDEX `Contest_authorId_created_idx`(`authorId`, `created` DESC),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
