import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({ component: About });

function About() {
  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          About me
        </h1>

        <div className="flex flex-col text-lg gap-4 mt-4">
          <p>
            TL;DR: I&lsquo;m knowledgeable about web dev and making music 🤓 and I have a couple of
            miniature pig rescues. 🐷
          </p>

          <hr />

          <p>
            I&lsquo;m currently the lead UX/UI developer at{" "}
            <a href="https://www.guardrail.ai/">Guardrail</a>. I've written almost the entire
            customer-facing web application by myself! I opted to use React with a couple of the
            Tanstack tools (Router, Form, Query). My primary focus has been crafting a codebase that
            results in a good developer experience while also making it easy to ship stuff fast. I
            also did API development related to the frontend work I was doing.
          </p>

          <p>
            My time at <a href="https://www.applyboard.com/">ApplyBoard</a> was almost entirely on
            the UI Engineering team, where I was responsible for the company's design system. I was
            responsible for managing much of the frontend CI tooling as well!
          </p>

          <hr />

          <p>
            While I'm putting this section second, music is my true passion. There is something so
            deeply fulfilling about making something your own that invokes a specific feeling. You
            can check out my works <Link to="/music">here</Link>!
          </p>

          <hr />

          <p>
            I spend a good chunk of my time working on home renovations, and much of that is
            animal-related – I have a couple of miniature pigs, all of which are rescues. Check out
            their <a href="https://www.instagram.com/pigs_of_scotland/">dedicated Instagram page</a>
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
