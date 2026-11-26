import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = await prisma.article.findUnique({
    where: { slug },
    include: { species: true },
  });

  if (!article) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-8 py-12">
      {article.type === "SUCCESS_STORY" && (
  <p className="mb-2 inline-block rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
    Success story
  </p>
)}
      <p className="text-sm text-gray-500">
        {article.publishedAt.toLocaleDateString("en-GB", { dateStyle: "long" })}
      </p>
      <h1 className="mt-1 text-3xl font-bold">{article.title}</h1>

      <div className="mt-6 space-y-4">
        {article.body.split("\n\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {article.sourceUrl && (
        <p className="mt-6 text-sm">
          Source:{" "}
          <a
            href={article.sourceUrl}
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {article.sourceName ?? article.sourceUrl}
          </a>
        </p>
      )}

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Species in this story</h2>
        <ul className="mt-2 list-disc pl-6">
          {article.species.map((s) => (
            <li key={s.id}>
              <Link href={`/species/${s.slug}`} className="underline">
                {s.commonName}
              </Link>{" "}
              <span className="text-sm text-gray-500">
                ({s.status.replace(/_/g, " ").toLowerCase()})
              </span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}