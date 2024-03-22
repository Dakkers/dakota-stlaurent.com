"use client"

import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

export function Navbar() {
  const items = [
    {
      href: '/',
      text: 'Home'
    },
    {
      href: '/about',
      text: 'About'
    },
  ]

  return (
    <NavigationMenu>
      <NavigationMenuList className="mt-4">
        {items.map((item,i) => (
          <Item href={item.href} key={i}>{item.text}</Item>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function Item ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <NavigationMenuItem>
      <Link href={href} legacyBehavior passHref>
        <NavigationMenuLink className="hover:bg-slate-600 p-4">
          {children}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  )
}
