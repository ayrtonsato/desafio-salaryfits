-- DropForeignKey
ALTER TABLE `weather` DROP FOREIGN KEY `weather_lat_lon_id_fkey`;

-- AlterTable
ALTER TABLE `weather` ADD COLUMN `forecast_id` VARCHAR(191) NULL,
    MODIFY `lat_lon_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `Forecast` (
    `id` VARCHAR(191) NOT NULL,
    `lat_lon_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `weather` ADD CONSTRAINT `weather_lat_lon_id_fkey` FOREIGN KEY (`lat_lon_id`) REFERENCES `lat_lon`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `weather` ADD CONSTRAINT `weather_forecast_id_fkey` FOREIGN KEY (`forecast_id`) REFERENCES `Forecast`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Forecast` ADD CONSTRAINT `Forecast_lat_lon_id_fkey` FOREIGN KEY (`lat_lon_id`) REFERENCES `lat_lon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
