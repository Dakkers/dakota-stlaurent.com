import { createFileRoute, Link } from "@tanstack/react-router";
import { posts } from "./posts/-posts/summary";

export const Route = createFileRoute("/blog/")({ component: Blog });

const MUSIC_CATS = new Set([
  "music",
  "songwriting",
  "arranging",
  "producing",
  "composing",
  "music theory",
]);
const SCHOOL_CATS = new Set(["school"]);
const BOOKS_CATS = new Set(["books"]);

function categoryGroup(cat: string): "music" | "school" | "books" | "default" {
  const c = cat.toLowerCase();
  if (MUSIC_CATS.has(c)) return "music";
  if (SCHOOL_CATS.has(c)) return "school";
  if (BOOKS_CATS.has(c)) return "books";
  return "default";
}

function CategoryChip({ label }: { label: string }) {
  const group = categoryGroup(label);
  const style =
    group === "default"
      ? {
          background: "var(--chip-bg)",
          border: "1px solid var(--chip-line)",
          color: "var(--sea-ink-soft)",
        }
      : {
          background: `var(--chip-${group}-bg)`,
          border: `1px solid var(--chip-${group}-line)`,
          color: `var(--chip-${group}-ink)`,
        };

  return (
    <span style={style} className="inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold">
      {label}
    </span>
  );
}

function Blog() {
  const allPosts = posts.all();

  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <h1 className="display-title mb-8 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          Blog
        </h1>
        <ul className="space-y-6">
          {allPosts.map((post) => (
            <li key={post.slug}>
              <Link
                to="/blog/posts/$postSlug"
                params={{ postSlug: post.slug }}
                className="group block"
              >
                <h2 className="text-xl font-semibold text-[var(--sea-ink)] group-hover:underline">
                  {post.title}
                </h2>
                <div className="flex">
                  <p className="text-sm text-[var(--sea-ink-soft)]">
                    {post.date.toLocaleDateString("en-CA", { dateStyle: "long" })}
                  </p>
                </div>
                {post.excerpt && (
                  <p className="mt-2 text-sm text-[var(--sea-ink-soft)]">{post.excerpt}...</p>
                )}
                {post.categories.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {post.categories.map((cat) => (
                      <CategoryChip key={cat} label={cat} />
                    ))}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
