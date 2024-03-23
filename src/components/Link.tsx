import NextLink from "next/link";

export function Link({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const Tag = href.startsWith("/") ? NextLink : "a";

  return (
    <Tag
      className="text-sky-700 visited:text-purple-800 dark:text-sky-400 dark:visited:text-purple-600 underline"
      href={href}
    >
      {children}
    </Tag>
  );
}
