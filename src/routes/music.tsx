import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/music")({ component: Music });

function Music() {
  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          Music
        </h1>
        <p className="m-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          Temporary content — music page coming soon.
        </p>
      </section>
    </main>
  );
}
