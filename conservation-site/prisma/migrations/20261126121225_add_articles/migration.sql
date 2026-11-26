-- CreateEnum
CREATE TYPE "ArticleType" AS ENUM ('NEWS', 'SUCCESS_STORY');

-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "type" "ArticleType" NOT NULL DEFAULT 'NEWS',
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "sourceName" TEXT,
    "sourceUrl" TEXT,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ArticleToSpecies" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ArticleToSpecies_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");

-- CreateIndex
CREATE INDEX "_ArticleToSpecies_B_index" ON "_ArticleToSpecies"("B");

-- AddForeignKey
ALTER TABLE "_ArticleToSpecies" ADD CONSTRAINT "_ArticleToSpecies_A_fkey" FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToSpecies" ADD CONSTRAINT "_ArticleToSpecies_B_fkey" FOREIGN KEY ("B") REFERENCES "Species"("id") ON DELETE CASCADE ON UPDATE CASCADE;
