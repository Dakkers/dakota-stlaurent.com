import { Link as RouterLink } from "@tanstack/react-router";
import type { AnchorHTMLAttributes, ComponentProps } from "react";

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  to?: never;
};

type InternalLinkProps = ComponentProps<typeof RouterLink> & {
  href?: never;
};

export type LinkProps = ExternalLinkProps | InternalLinkProps;

export function Link(props: LinkProps) {
  const className = `
    text-[var(--secondary-500)] 
    hover:text-[var(--secondary-600)] 
    weight-medium
    underline 
    decoration-[var(--secondary-500)] 
    hover:decoration-[var(--secondary-600)] 
    decoration-1 
    underline-offset-2 
  `

  if (props.href !== undefined) {
    return <a {...(props )} className={className} />;
  }
  return <RouterLink {...(props)} className={className} />;
}
