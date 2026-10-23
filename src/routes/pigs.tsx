import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "../components/PageTitle";
import { ExternalLink } from "#/components/Link";

export const Route = createFileRoute("/pigs")({ component: Pigs });

const pigs = ["Poppy", "Lulu", "Berta"];

const gallery = [
  { src: "/pigs/pig-1.jpg", alt: "A pig sitting in a muddy puddle beside a blue kiddie pool" },
  { src: "/pigs/pig-2.jpg", alt: "A pale pink and grey pig lying down and looking at the camera" },
  { src: "/pigs/pig-3.jpg", alt: "A dark pig resting in the leaves beneath some bushes" },
  { src: "/pigs/pig-4.jpg", alt: "A close-up of a black pig's snout" },
  { src: "/pigs/pig-5.jpg", alt: "A grey and black spotted pig with a blue glove on its head" },
  { src: "/pigs/pig-6.jpg", alt: "A dark pig napping in the grass" },
  { src: "/pigs/pig-7.jpg", alt: "A black pig standing in the grass with its snout raised" },
];

function Pigs() {
  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <PageTitle className="mb-3">My pigs 🐷</PageTitle>

        <div className="flex flex-col text-lg gap-4 mt-4">
          <p>
            I share my home with a few miniature pigs, and every one of them is a rescue. Meet{" "}
            {pigs.slice(0, -1).join(", ")} and {pigs[pigs.length - 1]}!
          </p>

          <p>
            Want to see more? They have their own page on Instagram:{" "}
            <ExternalLink href="https://www.instagram.com/pigs_of_scotland/">
              @pigs_of_scotland
            </ExternalLink>
            .
          </p>
        </div>

        <div className="flex justify-center mt-8">
          <figure>
            <img
              alt="Poppy, Lulu, and Berta, my miniature pigs"
              className="rounded max-w-none h-[200px] w-[250px] md:h-[400px] md:w-[500px]"
              src="/pigs.jpg"
            />
            <figcaption className="italic text-sm pt-1 text-center">
              From left: Poppy, Lulu, Berta
            </figcaption>
          </figure>
        </div>

        <hr className="mt-10" />

        <ul className="mt-8 grid list-none grid-cols-2 gap-3 p-0 md:grid-cols-3">
          {gallery.map(({ src, alt }) => (
            <li key={src}>
              <img
                alt={alt}
                className="aspect-[3/4] w-full rounded object-cover"
                loading="lazy"
                src={src}
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
