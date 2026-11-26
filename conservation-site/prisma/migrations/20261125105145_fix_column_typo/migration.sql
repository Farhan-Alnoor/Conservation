/*
  Warnings:

  - You are about to drop the column `scientifcName` on the `Species` table. All the data in the column will be lost.
  - Added the required column `scientificName` to the `Species` table without a default value. This is not possible if the table is not empty.

*/

ALTER TABLE "Species" RENAME COLUMN "scientifcName" TO "scientificName";