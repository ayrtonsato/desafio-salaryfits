-- CreateTable
CREATE TABLE `weather` (
    `id` VARCHAR(191) NOT NULL,
    `temp` DECIMAL(3, 2) NOT NULL,
    `feels_like` DECIMAL(3, 2) NOT NULL,
    `temp_min` DECIMAL(3, 2) NOT NULL,
    `temp_max` DECIMAL(3, 2) NOT NULL,
    `pressure` DECIMAL(3, 2) NOT NULL,
    `humidity` DECIMAL(3, 2) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
