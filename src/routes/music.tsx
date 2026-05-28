import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "../components/PageTitle";

export const Route = createFileRoute("/music")({ component: Music });

function Music() {
  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <PageTitle className="mb-3">Music</PageTitle>
        <p className="m-0 max-w-3xl text-base leading-8 text-[var(--primary-400)]">
          Temporary content — music page coming soon.
        </p>
      </section>
    </main>
  );
}
