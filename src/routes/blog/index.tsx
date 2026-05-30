import { createFileRoute } from "@tanstack/react-router";
import { posts } from "./posts/-posts/summary";
import { PageTitle } from "../../components/PageTitle";
import { CategoryChips } from "./-components/CategoryChips";
import Markdown from "react-markdown";
import { Link } from "#/components/Link";

export const Route = createFileRoute("/blog/")({ component: Blog });

function Blog() {
  const allPosts = posts.all();

  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <PageTitle className="mb-8">Blog</PageTitle>

        <ul className="space-y-6">
          {allPosts.map((post) => (
            <li key={post.slug}>
              <h2 className="inline-block text-xl font-semibold">
                <Link
                  to="/blog/posts/$postSlug"
                  params={{ postSlug: post.slug }}
                  className="text-[var(--primary-300)] hover:underline"
                >
                  <Markdown>{post.title}</Markdown>
                </Link>
              </h2>
              <div className="flex">
                <div className="text-sm text-[var(--primary-400)]">
                  {post.date.toLocaleDateString("en-CA", { dateStyle: "long" })}
                </div>
              </div>
              {post.excerpt && (
                <div className="mt-2 text-sm text-[var(--primary-400)]">
                  <Markdown>{`${post.excerpt}...`}</Markdown>
                </div>
              )}
              <CategoryChips categories={post.categories} className="mt-3" />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
