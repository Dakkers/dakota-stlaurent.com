import { Link } from "@/components/Link";
import { PageTitle } from "@/components/PageTitle";

export default function Tools() {
  const tools = [
    {
      desc: "Go through the 12 musical keys at random as opposed to the circle of fifths or other patterns that would cause you to develop muscle memory you don't want!",
      href: "keys",
      title: "Keys At Random",
    },
  ];

  return (
    <div>
      <PageTitle>Tools</PageTitle>
      <p className="mb-4">
        Sometimes I build things that I find useful, and you know what they
        say... sharing is caring!
      </p>
      <div>
        {tools.map((tool, i) => (
          <ToolCard {...tool} key={i} />
        ))}
      </div>
    </div>
  );
}

function ToolCard({
  desc,
  href,
  title,
}: {
  desc: string;
  href: string;
  title: string;
}) {
  return (
    <article className="w-100 sm:w-[350px] p-4 rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50">
      <header className="flex flex-col space-y-1.5 mb-4">
        <h2 className="font-bold">{title}</h2>
      </header>
      <p>{desc}</p>
      <footer className="flex justify-end mt-4">
        <Link href={`/tools/${href}`}>Try it</Link>
      </footer>
    </article>
  );
}
