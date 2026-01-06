/*
  Warnings:

  - Added the required column `required_skills` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Job` ADD COLUMN `required_skills` JSON NOT NULL;
