import ArticleList from "@/components/ArticleList";
import { prisma } from "@/lib/prisma";

export default async function StoriesPage() {
  const articles = await prisma.article.findMany({
    where: { type: "SUCCESS_STORY" },
    orderBy: { publishedAt: "desc" },
    include: { species: { select: { slug: true, commonName: true } } },
  });

  return (
    <main className="mx-auto max-w-5xl px-8 py-12">
      <h1 className="text-3xl font-bold">Success stories</h1>
      <p className="mt-2 text-gray-600">
        Proof that conservation works: species brought back from the brink.
      </p>
      <ArticleList articles={articles} />
    </main>
  );
}