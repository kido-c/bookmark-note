/*
  Warnings:

  - Added the required column `orderIdx` to the `Bookmark` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderIdx` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Bookmark` ADD COLUMN `orderIdx` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Category` ADD COLUMN `orderIdx` INTEGER NOT NULL;
