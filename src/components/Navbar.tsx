"use client";
import * as React from "react";
import Link from "next/link";
import { cn } from "@/utils";
import { usePathname } from "next/navigation";

export function Navbar() {
  const items = [
    {
      href: "/",
      text: "Home",
    },
    {
      href: "/about",
      text: "About",
    },
    {
      href: "/tools",
      text: "Tools",
    },
  ];

  return (
    <nav className="">
      <ul className="flex">
        {items.map((item, i) => (
          <Item href={item.href} key={i}>
            {item.text}
          </Item>
        ))}
      </ul>
    </nav>
  );
}

function Item({ children, href }: { children: React.ReactNode; href: string }) {
  const p = usePathname();

  return (
    <li>
      <Link
        className={cn(
          "inline-flex items-center cursor-pointer h-12 px-4",
          p === href ? "bg-slate-700 text-white" : "hover:bg-slate-300",
        )}
        href={href}
      >
        {children}
      </Link>
    </li>
  );
}
