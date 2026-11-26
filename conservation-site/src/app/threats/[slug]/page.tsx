import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function ThreatPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const threat = await prisma.threat.findUnique({
    where: { slug },
    include: { species: true },
  });

  if (!threat) {
    notFound();
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">{threat.name}</h1>
      <p className="mt-4 max-w-prose">{threat.description}</p>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Species affected</h2>
        <ul className="mt-2 list-disc pl-6">
          {threat.species.map((s) => (
            <li key={s.id}>
              <Link href={`/species/${s.slug}`} className="underline">
                {s.commonName}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}