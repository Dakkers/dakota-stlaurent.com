import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "../components/PageTitle";
import { ExternalLink } from "#/components/Link";

export const Route = createFileRoute("/pigs")({ component: Pigs });

interface Pig {
  name: string;
  subtitle: string;
  bio: string;
  photo: { src: string; alt: string };
  adopted: string;
  approxBirthYear: number;
}

const pigs: Pig[] = [
  {
    name: "Poppy",
    subtitle: "The gentle one",
    bio: "Poppy was adopted when Ralphy's Retreat had to downsize and move. Even though she's the oldest, she's at the bottom of the “pecking order” due to her timid nature.",
    photo: { src: "/pigs/poppy.jpg", alt: "A close-up of Poppy's snout" },
    adopted: "2021-12-01",
    approxBirthYear: 2017,
  },
  {
    name: "Lulu",
    subtitle: "The criminal mastermind",
    bio: "Lulu is bonded with Pua. She's as smart as a whip, to the point where I'm convinced she's an alien in a pig's body. If she had opposable thumbs, she'd be unstoppable.",
    photo: {
      src: "/pigs/lulu.jpg",
      alt: "Lulu sitting in a muddy puddle beside a blue kiddie pool",
    },
    adopted: "2022-08-01",
    approxBirthYear: 2018,
  },
  {
    name: "Pua",
    subtitle: "The social one",
    bio: "Pua is bonded with Lulu. She's at the top of the pecking order, which is funny because she is easily spooked by new noises. She's the most approachable.",
    photo: {
      src: "/pigs/pua.jpg",
      alt: "Pua, a grey and black spotted pig, with a blue glove on her head",
    },
    adopted: "2022-08-01",
    approxBirthYear: 2018,
  },
  {
    name: "Berta",
    subtitle: "The wrinkly one",
    bio: "Berta was unlawfully kept in a house in Oshawa where she didn't get to go out much. Since I got her, she's changed dramatically. She's not spayed so she gets “zesty”.",
    photo: {
      src: "/pigs/berta.jpg",
      alt: "Berta standing in the grass with her snout raised",
    },
    adopted: "2023-08-01",
    approxBirthYear: 2020,
  },
  {
    name: "Marge",
    subtitle: "The nibbly one",
    bio: "Watch your fingers around Marge - she's a bit grabby when it comes to food. She's also exceptionally vocal and gets upset when she's being detained after getting into an area she shouldn't be.",
    photo: {
      src: "/pigs/marge.jpg",
      alt: "Marge, a pale pink and grey pig, lying down and looking at the camera",
    },
    adopted: "2023-11-01",
    approxBirthYear: 2017,
  },
  {
    name: "Mary-Kate",
    subtitle: "The chunky one",
    bio: "Mary-Kate is the fatter twin without a doubt. She's highly food-motivated (like all pigs!) but she's well socialized. She gets mad when you don't let her steal Ashley's food.",
    photo: {
      src: "/pigs/marykate.jpg",
      alt: "Mary-Kate resting in the leaves beneath some bushes",
    },
    adopted: "2026-07-01",
    approxBirthYear: 2022,
  },
  {
    name: "Ashley",
    subtitle: "The nervous one",
    bio: "Ashley has taken a while to get comfortable on the farm but she's growing bolder every day! She might be the laziest pig of the bunch, which is a serious feat.",
    photo: { src: "/pigs/ashley.jpg", alt: "Ashley napping in the grass" },
    adopted: "2026-07-01",
    approxBirthYear: 2022,
  },
];

const pigsByAdoption = [...pigs].sort((a, b) => a.adopted.localeCompare(b.adopted));

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
          <dd>{formatAdopted(adopted)}</dd>
          <dt className="font-semibold text-[var(--primary-300)]">Age</dt>
          <dd>{formatAge(approxBirthYear)}</dd>
        </dl>
        <p className="mt-3 text-base leading-7 text-[var(--primary-400)]">{bio}</p>
      </div>
    </article>
  );
}
