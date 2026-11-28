import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Hero from "@/components/Hero";
export default async function Home() {
  const [speciesCount, organizationCount, threatCount, atRisk] =
    await Promise.all([
      prisma.species.count(),
      prisma.organization.count(),
      prisma.threat.count(),
      prisma.species.findMany({
        where: { status: { in: ["CRITICALLY_ENDANGERED", "ENDANGERED"] } },
        orderBy: { createdAt: "desc" },
        take: 3,
      }),
    ]);

  const stats = [
    { label: "Species", value: speciesCount },
    { label: "Organizations", value: organizationCount },
    { label: "Threats tracked", value: threatCount },
  ];

  return (
    <main className="mx-auto max-w-5xl px-8 py-12">
      <section>
        <Hero/>
        
        <Link
          href="/species"
          className="mt-6 inline-block rounded bg-green-700 px-5 py-2 font-medium text-white hover:bg-green-800"
        >
          Explore species
        </Link>
      </section>

      <section className="mt-12 grid grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded border border-gray-200 p-4">
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Most at risk</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {atRisk.map((species) => (
            <Link
              key={species.id}
              href={`/species/${species.slug}`}
              className="rounded border border-gray-200 p-4 hover:border-green-700"
            >
              <h3 className="font-semibold">{species.commonName}</h3>
              <p className="text-sm capitalize text-gray-500">
                {species.status.replace(/_/g, " ").toLowerCase()}
              </p>
              <p className="mt-2 text-sm">{species.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}