import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "../components/PageTitle";
import { ExternalLink } from "#/components/Link";

export const Route = createFileRoute("/pigs")({ component: Pigs });

interface Pig {
  name: string;
  subtitle: string;
  bio: string;
  photo: { src: string; alt: string };
  adopted?: string;
  approxBirthYear?: number;
}

const subtitlePlaceholder = "Cheeky title coming soon";
const bioPlaceholder = "A bit about this pig coming soon.";
const detailPlaceholder = "Coming soon";

const pigs: Pig[] = [
  {
    name: "Lulu",
    subtitle: subtitlePlaceholder,
    bio: bioPlaceholder,
    photo: {
      src: "/pigs/lulu.jpg",
      alt: "Lulu sitting in a muddy puddle beside a blue kiddie pool",
    },
  },
  {
    name: "Marge",
    subtitle: subtitlePlaceholder,
    bio: bioPlaceholder,
    photo: {
      src: "/pigs/marge.jpg",
      alt: "Marge, a pale pink and grey pig, lying down and looking at the camera",
    },
  },
  {
    name: "MaryKate",
    subtitle: subtitlePlaceholder,
    bio: bioPlaceholder,
    photo: {
      src: "/pigs/marykate.jpg",
      alt: "MaryKate resting in the leaves beneath some bushes",
    },
  },
  {
    name: "Poppy",
    subtitle: subtitlePlaceholder,
    bio: bioPlaceholder,
    photo: { src: "/pigs/poppy.jpg", alt: "A close-up of Poppy's snout" },
  },
  {
    name: "Pua",
    subtitle: subtitlePlaceholder,
    bio: bioPlaceholder,
    photo: {
      src: "/pigs/pua.jpg",
      alt: "Pua, a grey and black spotted pig, with a blue glove on her head",
    },
  },
  {
    name: "Ashley",
    subtitle: subtitlePlaceholder,
    bio: bioPlaceholder,
    photo: { src: "/pigs/ashley.jpg", alt: "Ashley napping in the grass" },
  },
  {
    name: "Berta",
    subtitle: subtitlePlaceholder,
    bio: bioPlaceholder,
    photo: {
      src: "/pigs/berta.jpg",
      alt: "Berta standing in the grass with her snout raised",
    },
  },
];

const pigsByAdoption = [...pigs].sort((a, b) =>
  (a.adopted ?? "9999").localeCompare(b.adopted ?? "9999"),
);

function formatAdopted(adopted: string) {
  return new Date(adopted).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}

function formatAge(approxBirthYear: number) {
  const years = new Date().getFullYear() - approxBirthYear;
  return years < 1 ? "Under a year old" : `About ${years} ${years === 1 ? "year" : "years"} old`;
}

function Pigs() {
  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <PageTitle className="mb-3">My pigs 🐷</PageTitle>

        <div className="flex flex-col text-lg gap-4 mt-4">
          <p>Every one of my miniature pigs is a rescue. Meet the whole crew!</p>

          <p>
            Want to see more? They have their own page on Instagram:{" "}
            <ExternalLink href="https://www.instagram.com/pigs_of_scotland/">
              @pigs_of_scotland
            </ExternalLink>
            .
          </p>
        </div>

        <ul className="mt-8 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {pigsByAdoption.map((pig) => (
            <li key={pig.name}>
              <PigCard pig={pig} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

function PigCard({ pig: { name, subtitle, bio, photo, adopted, approxBirthYear } }: { pig: Pig }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface-strong)]">
      <img
        alt={photo.alt}
        className="aspect-[4/5] w-full object-cover"
        loading="lazy"
        src={photo.src}
      />
      <div className="flex flex-col gap-1 p-5">
        <h2 className="display-title text-2xl font-bold text-[var(--primary-300)]">{name}</h2>
        <p className="text-sm font-semibold italic text-[var(--secondary-500)]">{subtitle}</p>
        <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm text-[var(--primary-400)]">
          <dt className="font-semibold text-[var(--primary-300)]">Adopted</dt>
          <dd>{adopted ? formatAdopted(adopted) : detailPlaceholder}</dd>
          <dt className="font-semibold text-[var(--primary-300)]">Age</dt>
          <dd>{approxBirthYear ? formatAge(approxBirthYear) : detailPlaceholder}</dd>
        </dl>
        <p className="mt-3 text-base leading-7 text-[var(--primary-400)]">{bio}</p>
      </div>
    </article>
  );
}
