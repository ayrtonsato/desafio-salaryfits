/*
  Warnings:

  - You are about to alter the column `temp` on the `weather` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,2)` to `Decimal(8,2)`.
  - You are about to alter the column `feels_like` on the `weather` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,2)` to `Decimal(8,2)`.
  - You are about to alter the column `temp_min` on the `weather` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,2)` to `Decimal(8,2)`.
  - You are about to alter the column `temp_max` on the `weather` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,2)` to `Decimal(8,2)`.
  - You are about to alter the column `pressure` on the `weather` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,2)` to `Decimal(8,2)`.
  - You are about to alter the column `humidity` on the `weather` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,2)` to `Decimal(8,2)`.

*/
-- AlterTable
ALTER TABLE `weather` MODIFY `temp` DECIMAL(8, 2) NOT NULL,
    MODIFY `feels_like` DECIMAL(8, 2) NOT NULL,
    MODIFY `temp_min` DECIMAL(8, 2) NOT NULL,
    MODIFY `temp_max` DECIMAL(8, 2) NOT NULL,
    MODIFY `pressure` DECIMAL(8, 2) NOT NULL,
    MODIFY `humidity` DECIMAL(8, 2) NOT NULL;
