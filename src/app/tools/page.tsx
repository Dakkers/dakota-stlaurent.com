import React from "react";
import { Link } from "@/components/Link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <>
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
    </>
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
    <Card className="w-100 sm:w-[350px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end">
        <Link href={`/tools/${href}`}>Try it</Link>
      </CardFooter>
    </Card>
  );
}
