/*
  Warnings:

  - Made the column `country` on table `country_code` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `country_code` MODIFY `country` VARCHAR(255) NOT NULL;
