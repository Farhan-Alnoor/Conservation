import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PopulationChart from "@/components/PopulationChart";

export default async function SpeciesDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const species = await prisma.species.findUnique({
    where: { slug },
    include: { threats: true, organizations: true, populationRecords: {orderBy : {year : "asc"}} ,articles: { orderBy: { publishedAt: "desc" }, take: 3 },},
  });

  if (!species) {
    notFound();
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">{species.commonName}</h1>
      <p className="mt-1 text-sm italic text-gray-500">
        {species.scientificName}
      </p>
      <p className="mt-4 font-medium">Status: {species.status}</p>
      <p className="mt-4 max-w-prose">{species.summary}</p>
      <section className="mt-8">
  <h2 className="text-xl font-semibold">Population</h2>
  {species.populationRecords.length === 0 ? (
    <p className="mt-2 text-gray-500">No population data yet.</p>
  ) : (
    <>
    {species.populationRecords.length > 1 && (
      <div className="mt-4">
        <PopulationChart
          data={species.populationRecords.map((record) => ({
            year: record.year,
            estimate: record.estimate,
          }))}
        />
      </div>
    )}
    <table className="mt-2 text-left text-sm">
      <thead>
        <tr>
          <th className="pr-8 font-medium">Year</th>
          <th className="font-medium">Estimated population</th>
        </tr>
      </thead>
      <tbody>
        {species.populationRecords.map((record) => (
          <tr key={record.id}>
            <td className="pr-8">{record.year}</td>
            <td>{record.estimate.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  )}
</section>
       <section className="mt-8">
        <h2 className="text-xl font-semibold">Threats</h2>
        <ul className="mt-2 list-disc pl-6">
          {species.threats.map((threat) => (
            <li key={threat.id}>
              <Link href={`/threats/${threat.slug}`} className="font-medium underline">
  {threat.name}
</Link>
:{" "}
              {threat.description}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Organizations helping</h2>
        <ul className="mt-2 space-y-3">
          {species.organizations.map((org) => (
            <li key={org.id}>
             <Link href={`/organizations/${org.slug}`} className="font-medium underline">
  {org.name}
</Link>
              <p>{org.description}</p>
              {org.donateUrl && (
                <a href={org.donateUrl} className="mr-4 text-green-700 underline">
                  Donate
                </a>
              )}
              {org.volunteerUrl && (
                <a href={org.volunteerUrl} className="text-green-700 underline">
                  Volunteer
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-8">
  <h2 className="text-xl font-semibold">Related articles</h2>
  {species.articles.length === 0 ? (
    <p className="mt-2 text-gray-500">No articles yet.</p>
  ) : (
    <ul className="mt-2 space-y-2">
      {species.articles.map((article) => (
        <li key={article.id}>
          <Link href={`/articles/${article.slug}`} className="underline">
            {article.title}
          </Link>
        </li>
      ))}
    </ul>
  )}
</section>
    </main>
  );
}