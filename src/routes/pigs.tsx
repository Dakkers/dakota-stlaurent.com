import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "../components/PageTitle";
import { ExternalLink } from "#/components/Link";

export const Route = createFileRoute("/pigs")({ component: Pigs });

const pigs = ["Poppy", "Lulu", "Berta"];

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
      </section>
    </main>
  );
}
