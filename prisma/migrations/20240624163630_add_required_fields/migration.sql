/*
  Warnings:

  - The primary key for the `Bookmark` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bookmark_id` on the `Bookmark` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `Bookmark` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Bookmark` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Bookmark` table. All the data in the column will be lost.
  - The primary key for the `BookmarkTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bookmark_id` on the `BookmarkTag` table. All the data in the column will be lost.
  - You are about to drop the column `tag_id` on the `BookmarkTag` table. All the data in the column will be lost.
  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category_id` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `category_name` on the `Category` table. All the data in the column will be lost.
  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tag_id` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `tag_name` on the `Tag` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `User` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Bookmark` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Bookmark` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Bookmark` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bookmarkId` to the `BookmarkTag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tagId` to the `BookmarkTag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bgColor` to the `Tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `textColor` to the `Tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Bookmark` DROP FOREIGN KEY `Bookmark_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `Bookmark` DROP FOREIGN KEY `Bookmark_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `BookmarkTag` DROP FOREIGN KEY `BookmarkTag_bookmark_id_fkey`;

-- DropForeignKey
ALTER TABLE `BookmarkTag` DROP FOREIGN KEY `BookmarkTag_tag_id_fkey`;

-- AlterTable
ALTER TABLE `Bookmark` DROP PRIMARY KEY,
    DROP COLUMN `bookmark_id`,
    DROP COLUMN `category_id`,
    DROP COLUMN `created_at`,
    DROP COLUMN `user_id`,
    ADD COLUMN `categoryId` INTEGER NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `userId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `BookmarkTag` DROP PRIMARY KEY,
    DROP COLUMN `bookmark_id`,
    DROP COLUMN `tag_id`,
    ADD COLUMN `bookmarkId` INTEGER NOT NULL,
    ADD COLUMN `tagId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`bookmarkId`, `tagId`);

-- AlterTable
ALTER TABLE `Category` DROP PRIMARY KEY,
    DROP COLUMN `category_id`,
    DROP COLUMN `category_name`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Tag` DROP PRIMARY KEY,
    DROP COLUMN `tag_id`,
    DROP COLUMN `tag_name`,
    ADD COLUMN `bgColor` VARCHAR(191) NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `textColor` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    DROP COLUMN `created_at`,
    DROP COLUMN `user_id`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Bookmark` ADD CONSTRAINT `Bookmark_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bookmark` ADD CONSTRAINT `Bookmark_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookmarkTag` ADD CONSTRAINT `BookmarkTag_bookmarkId_fkey` FOREIGN KEY (`bookmarkId`) REFERENCES `Bookmark`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookmarkTag` ADD CONSTRAINT `BookmarkTag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
