import ArticleList from "@/components/ArticleList";
import { prisma } from "@/lib/prisma";

export default async function NewsPage() {
  const articles = await prisma.article.findMany({
    where: { type: "NEWS" },
    orderBy: { publishedAt: "desc" },
    include: { species: { select: { slug: true, commonName: true } } },
  });

  return (
    <main className="mx-auto max-w-5xl px-8 py-12">
      <h1 className="text-3xl font-bold">News</h1>
      <p className="mt-2 text-gray-600">
        The latest from the world of wildlife conservation.
      </p>
      <ArticleList articles={articles} />
    </main>
  );
}