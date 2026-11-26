import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function OrganizationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const org = await prisma.organization.findUnique({
    where: { slug },
    include: { species: true },
  });

  if (!org) {
    notFound();
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">{org.name}</h1>
      <p className="mt-4 max-w-prose">{org.description}</p>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Species they protect</h2>
        <ul className="mt-2 list-disc pl-6">
          {org.species.map((s) => (
            <li key={s.id}>
              <Link href={`/species/${s.slug}`} className="underline">
                {s.commonName}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Support their work</h2>
        <div className="mt-2 flex gap-4">
          <a href={org.websiteUrl} className="underline" target="_blank" rel="noopener noreferrer">
            Website
          </a>
          {org.donateUrl && (
            <a href={org.donateUrl} className="text-green-700 underline" target="_blank" rel="noopener noreferrer">
              Donate
            </a>
          )}
          {org.volunteerUrl && (
            <a href={org.volunteerUrl} className="text-green-700 underline" target="_blank" rel="noopener noreferrer">
              Volunteer
            </a>
          )}
        </div>
      </section>
    </main>
  );
}