import { createFileRoute, notFound } from "@tanstack/react-router";
import { allPosts } from "./-posts/summary";
import Markdown from "react-markdown";
import { PageTitle } from "@/components/PageTitle";
import { CategoryChips } from "@/routes/blog/-components/CategoryChips";
import { ExternalLink } from "#/components/Link";

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
        <PageTitle className="mb-3">
          <Markdown>{post.title}</Markdown>
        </PageTitle>
        <div className="flex items-center gap-4 mb-2">
          <p className="text-xs">
            {post.date.toLocaleDateString(undefined, { dateStyle: "long" })}
          </p>
          <CategoryChips categories={post.categories} />
        </div>
        <div className="mt-4 flex flex-col gap-3">
          <Markdown
            components={{
              a: (props) => <ExternalLink {...props} />,
              ul: (props) => <ul {...props} className="list-disc ml-6" />,
              h2: (props) => <h2 {...props} className="text-3xl font-semibold" />,
              h3: (props) => <h3 {...props} className="text-2xl font-semibold" />,
              h4: (props) => <h4 {...props} className="text-xl font-semibold" />,
              blockquote: (props) => (
                <blockquote
                  {...props}
                  className="[&_*]:block flex flex-col gap-2 border rounded-md p-4 mx-4"
                />
              ),
            }}
          >
            {post.content}
          </Markdown>
        </div>
      </section>
    </main>
  );
}
