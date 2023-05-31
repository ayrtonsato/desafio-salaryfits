/*
  Warnings:

  - You are about to drop the `Forecast` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Forecast` DROP FOREIGN KEY `Forecast_lat_lon_id_fkey`;

-- DropForeignKey
ALTER TABLE `weather` DROP FOREIGN KEY `weather_forecast_id_fkey`;

-- DropTable
DROP TABLE `Forecast`;

-- CreateTable
CREATE TABLE `forecast` (
    `id` VARCHAR(191) NOT NULL,
    `lat_lon_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `weather` ADD CONSTRAINT `weather_forecast_id_fkey` FOREIGN KEY (`forecast_id`) REFERENCES `forecast`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `forecast` ADD CONSTRAINT `forecast_lat_lon_id_fkey` FOREIGN KEY (`lat_lon_id`) REFERENCES `lat_lon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
