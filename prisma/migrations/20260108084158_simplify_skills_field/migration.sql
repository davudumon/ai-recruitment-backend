/*
  Warnings:

  - You are about to drop the column `extractedSkills` on the `Candidate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Candidate` DROP COLUMN `extractedSkills`,
    MODIFY `skills` JSON NULL;
