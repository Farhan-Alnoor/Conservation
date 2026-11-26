import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function OrganizationsPage() {
  const organizations = await prisma.organization.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { species: true } } },
  });

  return (
    <main className="mx-auto max-w-5xl px-8 py-12">
      <h1 className="text-3xl font-bold">Organizations</h1>
      <p className="mt-2 text-gray-600">
        The groups working on the ground to protect threatened species.
      </p>

      <ul className="mt-8 space-y-6">
        {organizations.map((org) => (
          <li key={org.id}>
            <h2 className="text-xl font-semibold">
              <Link href={`/organizations/${org.slug}`} className="hover:underline">
                {org.name}
              </Link>
            </h2>
            <p className="text-sm text-gray-500">
              Works on {org._count.species} species
            </p>
            <p className="mt-1 max-w-prose">{org.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}