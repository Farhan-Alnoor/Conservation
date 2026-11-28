import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const threats = [
  {
    slug: "habitat-loss",
    name: "Habitat loss and fragmentation",
    description:
      "Forests and grasslands are cleared for farming, plantations, roads and settlements, leaving tigers in isolated pockets too small to sustain healthy populations.",
  },
  {
    slug: "poaching",
    name: "Poaching and illegal wildlife trade",
    description:
      "Tigers are killed for their skins, bones and other body parts, which are sold in illegal markets. Snares set for other animals also catch tigers.",
  },
  {
    slug: "prey-depletion",
    name: "Loss of prey",
    description:
      "When deer, wild pigs and other prey are overhunted, tigers struggle to find enough food even in forests that are otherwise intact.",
  },
  {
    slug: "human-wildlife-conflict",
    name: "Human-wildlife conflict",
    description:
      "As tiger habitat shrinks, tigers and people increasingly meet. Attacks on livestock or people can lead to retaliatory killings.",
  },
];

const organizations = [
  {
    slug: "panthera",
    name: "Panthera",
    description:
      "A conservation organization dedicated to wild cats, running programs to protect tigers and other big cats.",
    websiteUrl: "https://www.panthera.org",
  },
  {
    slug: "wwf",
    name: "World Wide Fund for Nature (WWF)",
    description:
      "A global conservation organization working on wildlife, forests, oceans and climate, including long-running tiger recovery work.",
    websiteUrl: "https://www.worldwildlife.org",
  },
  {
    slug: "wcs",
    name: "Wildlife Conservation Society (WCS)",
    description:
      "A New York-based conservation organization with field programs in dozens of countries, including tiger conservation across Asia.",
    websiteUrl: "https://www.wcs.org",
  },
];

async function main() {
  for (const threat of threats) {
    await prisma.threat.upsert({
      where: { slug: threat.slug },
      update: threat,
      create: threat,
    });
  }

  for (const org of organizations) {
    await prisma.organization.upsert({
      where: { slug: org.slug },
      update: org,
      create: org,
    });
  }

  const tigerData = {
    commonName: "Tiger",
    scientificName: "Panthera tigris",
    status: "ENDANGERED" as const,
    summary:
      "The largest living cat, found in fragmented forests and grasslands across Asia. The latest assessment suggests numbers may be stable or rising overall, though they are still falling in parts of Southeast Asia.",
  };

  const tiger = await prisma.species.upsert({
    where: { slug: "tiger" },
    update: tigerData,
    create: { slug: "tiger", ...tigerData },
  });

  await prisma.species.update({
    where: { slug: "tiger" },
    data: {
      threats: { set: threats.map((t) => ({ slug: t.slug })) },
      organizations: { set: organizations.map((o) => ({ slug: o.slug })) },
    },
  });

  await prisma.populationRecord.deleteMany({ where: { speciesId: tiger.id } });
  await prisma.populationRecord.createMany({
    data: [
      {
        speciesId: tiger.id,
        year: 2009,
        estimate: 3200,
        source: "IUCN SSC Cat Specialist Group (catsg.org)",
        note: "Approximate global estimate; fewer than 2,500 mature animals were thought likely.",
      },
      {
        speciesId: tiger.id,
        year: 2021,
        estimate: 4500,
        source:
          "Goodrich et al. 2022, IUCN Red List (2021 assessment); average as summarised by Panthera",
        note: "Average of a 3,726 to 5,578 range, excluding cubs; about 3,140 were mature adults. Survey methods improved between assessments, so this is not a strict like-for-like comparison with 2009.",
      },
    ],
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());