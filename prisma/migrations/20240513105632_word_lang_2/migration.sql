/*
  Warnings:

  - The values [englih] on the enum `Word_language` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `word` MODIFY `language` ENUM('english', 'russian') NOT NULL;
