import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "../components/PageTitle";
import { ExternalLink } from "#/components/Link";

export const Route = createFileRoute("/work")({ component: Work });

function Work() {
  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <PageTitle className="mb-3">Work</PageTitle>

        <div className="flex flex-col text-lg gap-4 mt-4">
          <p>
            I&lsquo;m currently a developer at{" "}
            <ExternalLink href="https://www.rain.xyz/">Rain</ExternalLink>, a stablecoin-powered
            card issuing and payments platform. My days are split between shipping product work,
            reviewing a lot of pull requests, and the infrastructure that keeps it all running.
          </p>

          <hr />

          <p>
            Before that I was the lead UX/UI developer at{" "}
            <ExternalLink href="https://www.guardrail.ai/">Guardrail</ExternalLink>. I wrote almost
            the entire customer-facing web application by myself! I opted to use React with a couple
            of the Tanstack tools (Router, Form, Query). My primary focus was crafting a codebase
            that results in a good developer experience while also making it easy to ship stuff
            fast. I also did API development related to the frontend work I was doing.
          </p>

          <hr />

          <p>
            My time at <ExternalLink href="https://www.applyboard.com/">ApplyBoard</ExternalLink>{" "}
            was almost entirely on the UI Engineering team, where I was responsible for the
            company's design system. I was responsible for managing much of the frontend CI tooling
            as well!
          </p>

          <hr />

          <h2 className="text-2xl font-bold">Personal projects</h2>

          <ul className="flex flex-col gap-3 list-disc pl-6">
            <li>
              <ExternalLink href="https://github.com/Saintly-Software/baritone">
                Baritone
              </ExternalLink>{" "}
              – a whitelabel-first React design system built on vanilla-extract and base-ui.
            </li>
            <li>
              <ExternalLink href="https://github.com/Dakkers/ChessersEngine">Chessers</ExternalLink>{" "}
              – a chess variant, with an open-source C# engine.
            </li>
            <li>
              <ExternalLink href="https://github.com/Dakkers/rhymelab">RhymeLab</ExternalLink> – a
              workbench for annotating the rhyme scheme of songs and poems.
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
