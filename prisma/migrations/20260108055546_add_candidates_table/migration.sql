/*
  Warnings:

  - You are about to drop the column `domicile` on the `Candidate` table. All the data in the column will be lost.
  - Added the required column `jobId` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skills` to the `Candidate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Candidate` DROP COLUMN `domicile`,
    ADD COLUMN `aiReasoning` VARCHAR(191) NULL,
    ADD COLUMN `aiSummary` VARCHAR(191) NULL,
    ADD COLUMN `experienceSummary` VARCHAR(191) NULL,
    ADD COLUMN `extractedSkills` JSON NULL,
    ADD COLUMN `jobId` INTEGER NOT NULL,
    ADD COLUMN `matchScore` DOUBLE NULL,
    ADD COLUMN `rawCvText` VARCHAR(191) NULL,
    ADD COLUMN `skills` JSON NOT NULL,
    ADD COLUMN `yearsOfExperience` INTEGER NULL,
    MODIFY `fullName` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Candidate` ADD CONSTRAINT `Candidate_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `Job`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
