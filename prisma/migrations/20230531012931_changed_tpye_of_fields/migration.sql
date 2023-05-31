/*
  Warnings:

  - You are about to alter the column `lat` on the `lat_lon` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - You are about to alter the column `lon` on the `lat_lon` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE `lat_lon` MODIFY `lat` DECIMAL(65, 30) NOT NULL,
    MODIFY `lon` DECIMAL(65, 30) NOT NULL;
