import { createFileRoute, Link } from "@tanstack/react-router";
import { PageTitle } from "../../components/PageTitle";

export const Route = createFileRoute("/tools/")({ component: Tools });

const TOOLS = [
  {
    to: "/tools/keys" as const,
    title: "Musical Keys",
    description:
      "A practice aid that randomly cycles through all 12 musical keys, with MIDI controller support.",
  },
];

function Tools() {
  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <PageTitle className="mb-8">Tools</PageTitle>
        <ul className="space-y-6">
          {TOOLS.map((tool) => (
            <li key={tool.to}>
              <Link to={tool.to} className="group block">
                <h2 className="text-xl font-semibold text-[var(--primary-300)] group-hover:underline">
                  {tool.title}
                </h2>
                <p className="mt-1 text-sm text-[var(--primary-400)]">{tool.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
