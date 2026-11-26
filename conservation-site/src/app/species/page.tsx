import { prisma } from "@/lib/prisma";
import Link from "next/link";
export default async function SpeciesPage() {
  const speciesList = await prisma.species.findMany({
    orderBy: { commonName: "asc" },
  });

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Species</h1>
      <ul className="mt-6 space-y-4">
        {speciesList.map((species) => (
          <li key={species.id}>
            <h2 className="text-xl font-semibold">
  <Link href={`/species/${species.slug}`} className="hover:underline">
    {species.commonName}
  </Link>
</h2>
            <p className="text-sm italic text-gray-500">
              {species.scientificName} · {species.status}
            </p>
            <p className="mt-1">{species.summary}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}