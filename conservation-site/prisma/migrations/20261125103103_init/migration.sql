-- CreateEnum
CREATE TYPE "ConservationStatus" AS ENUM ('LEAST_CONCERN', 'NEAR_THREATENED', 'VULNERABLE', 'ENDANGERED', 'CRITICALLY_ENDANGERED', 'EXTINCT_IN_THE_WILD');

-- CreateTable
CREATE TABLE "Species" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "commonName" TEXT NOT NULL,
    "scientifcName" TEXT NOT NULL,
    "status" "ConservationStatus" NOT NULL,
    "summary" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Species_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Species_slug_key" ON "Species"("slug");
