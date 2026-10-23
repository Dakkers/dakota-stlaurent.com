import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "../components/PageTitle";
import { ExternalLink, Link } from "#/components/Link";

export const Route = createFileRoute("/about")({ component: About });

function About() {
  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <PageTitle className="mb-3">About me</PageTitle>

        <div className="flex flex-col text-lg gap-4 mt-4">
          <p>
            TL;DR: I&lsquo;m knowledgeable about web dev and making music 🤓 and I have a couple of
            miniature pig rescues. 🐷
          </p>

          <hr />

          <p>
            Want the dev side of things? Head over to my <Link to="/work">Work</Link> page.
          </p>

          {/* <hr />

          <p>
            While I'm putting this section second, music is my true passion. There is something so
            deeply fulfilling about making something your own that invokes a specific feeling. You
            can check out my works <Link to="/music">here</Link>!
          </p> */}

          <hr />

          <p>
            I spend a good chunk of my time working on home renovations, and much of that is
            animal-related – I have a couple of miniature pigs, all of which are rescues. Check out
            their{" "}
            <ExternalLink href="https://www.instagram.com/pigs_of_scotland/">
              dedicated Instagram page
            </ExternalLink>
            !
          </p>
        </div>

        <div className="flex justify-center mt-8">
          <figure>
            <img
              alt="Some of my minuature pigs"
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
