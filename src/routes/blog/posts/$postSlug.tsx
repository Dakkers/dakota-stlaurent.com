import { createFileRoute, notFound } from "@tanstack/react-router";
import { allPosts } from "./-posts/summary";
import Markdown from "react-markdown";

export const Route = createFileRoute("/blog/posts/$postSlug")({
  loader: ({ params }) => {
    const post = allPosts.find((p) => p.slug === params.postSlug);
    if (!post) throw notFound();
    return post;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const post = Route.useLoaderData();
  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <p className="island-kicker mb-2">
          {post.date.toLocaleDateString("en-CA", { dateStyle: "long" })}
        </p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          {post.title}
        </h1>
        <p className="text-sm text-[var(--sea-ink-soft)]">{post.categories.join(", ")}</p>
        <div className="mt-8">{post.content}</div>
      </section>
    </main>
  );
}
