import Link from "next/link";

type ArticleListItem = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  publishedAt: Date;
  species: { slug: string; commonName: string }[];
};

export default function ArticleList({
  articles,
}: {
  articles: ArticleListItem[];
}) {
  if (articles.length === 0) {
    return <p className="mt-8 text-gray-500">Nothing here yet.</p>;
  }

  return (
    <ul className="mt-8 space-y-8">
      {articles.map((article) => (
        <li key={article.id}>
          <p className="text-sm text-gray-500">
            {article.publishedAt.toLocaleDateString("en-GB", {
              dateStyle: "long",
            })}
          </p>
          <h2 className="text-xl font-semibold">
            <Link href={`/articles/${article.slug}`} className="hover:underline">
              {article.title}
            </Link>
          </h2>
          <p className="mt-1 max-w-prose">{article.summary}</p>
          <p className="mt-2 text-sm">
            {article.species.map((s) => (
              <Link
                key={s.slug}
                href={`/species/${s.slug}`}
                className="mr-3 text-green-700 underline"
              >
                {s.commonName}
              </Link>
            ))}
          </p>
        </li>
      ))}
    </ul>
  );
}