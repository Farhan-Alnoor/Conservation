-- CreateTable
CREATE TABLE "PopulationRecord" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "estimate" INTEGER NOT NULL,
    "source" TEXT,
    "speciesId" INTEGER NOT NULL,

    CONSTRAINT "PopulationRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PopulationRecord_speciesId_year_key" ON "PopulationRecord"("speciesId", "year");

-- AddForeignKey
ALTER TABLE "PopulationRecord" ADD CONSTRAINT "PopulationRecord_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE CASCADE ON UPDATE CASCADE;
