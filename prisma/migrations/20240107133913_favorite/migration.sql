/*
  Warnings:

  - Added the required column `favorite` to the `story` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "story" ADD COLUMN     "favorite" BOOLEAN NOT NULL;
