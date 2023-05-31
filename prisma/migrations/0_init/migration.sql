-- CreateTable
CREATE TABLE `country_code` (
    `code` INTEGER NOT NULL,
    `country` VARCHAR(255) NULL,

    UNIQUE INDEX `country`(`country`),
    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

