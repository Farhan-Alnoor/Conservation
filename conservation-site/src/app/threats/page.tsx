import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function ThreatsPage() {
  const threats = await prisma.threat.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { species: true } } },
  });

  return (
    <main className="mx-auto max-w-5xl px-8 py-12">
      <h1 className="text-3xl font-bold">Threats</h1>
      <p className="mt-2 text-gray-600">
        The pressures pushing wildlife toward extinction.
      </p>

      <ul className="mt-8 space-y-6">
        {threats.map((threat) => (
          <li key={threat.id}>
            <h2 className="text-xl font-semibold">
              <Link href={`/threats/${threat.slug}`} className="hover:underline">
                {threat.name}
              </Link>
            </h2>
            <p className="text-sm text-gray-500">
              Affects {threat._count.species} species
            </p>
            <p className="mt-1 max-w-prose">{threat.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}