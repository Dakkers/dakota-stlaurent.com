import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "../components/PageTitle";
import { ExternalLink } from "#/components/Link";

export const Route = createFileRoute("/pigs")({ component: Pigs });

const gallery = [
  {
    name: "Lulu",
    src: "/pigs/lulu.jpg",
    alt: "Lulu sitting in a muddy puddle beside a blue kiddie pool",
  },
  {
    name: "Marge",
    src: "/pigs/marge.jpg",
    alt: "Marge, a pale pink and grey pig, lying down and looking at the camera",
  },
  {
    name: "MaryKate",
    src: "/pigs/marykate.jpg",
    alt: "MaryKate resting in the leaves beneath some bushes",
  },
  { name: "Poppy", src: "/pigs/poppy.jpg", alt: "A close-up of Poppy's snout" },
  {
    name: "Pua",
    src: "/pigs/pua.jpg",
    alt: "Pua, a grey and black spotted pig, with a blue glove on her head",
  },
  { name: "Ashley", src: "/pigs/ashley.jpg", alt: "Ashley napping in the grass" },
  {
    name: "Berta",
    src: "/pigs/berta.jpg",
    alt: "Berta standing in the grass with her snout raised",
  },
];

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
          {gallery.map(({ name, src, alt }) => (
            <li key={src}>
              <figure>
                <img
                  alt={alt}
                  className="aspect-[3/4] w-full rounded object-cover"
                  loading="lazy"
                  src={src}
                />
                <figcaption className="italic text-sm pt-1 text-center">{name}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
