/*
  Warnings:

  - Added the required column `lat_lon_id` to the `weather` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `weather` ADD COLUMN `lat_lon_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `lat_lon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cc_id` INTEGER NOT NULL,
    `lat` INTEGER NOT NULL,
    `lon` INTEGER NOT NULL,
    `country` VARCHAR(2) NOT NULL,
    `state` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `weather` ADD CONSTRAINT `weather_lat_lon_id_fkey` FOREIGN KEY (`lat_lon_id`) REFERENCES `lat_lon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lat_lon` ADD CONSTRAINT `lat_lon_cc_id_fkey` FOREIGN KEY (`cc_id`) REFERENCES `country_code`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;
