import React from "react";

export function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-3xl md:text-5xl xl:text-7xl font-semibold mb-4">
      {children}
    </h1>
  );
}
