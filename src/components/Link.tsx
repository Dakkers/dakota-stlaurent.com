import { createLink, type LinkComponent } from "@tanstack/react-router";
import type { AnchorHTMLAttributes } from "react";
import React from "react";

const linkClassName = `
  text-[var(--secondary-500)]
  hover:text-[var(--secondary-600)]
  weight-medium
  underline
  decoration-[var(--secondary-500)]
  hover:decoration-[var(--secondary-600)]
  decoration-1
  underline-offset-2
`;

const LinkAnchor = React.forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(
  (props, ref) => <a ref={ref} {...props} className={linkClassName} />,
);

export const Link: LinkComponent<typeof LinkAnchor> = createLink(LinkAnchor);

export function ExternalLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a {...props} className={linkClassName} />;
}
