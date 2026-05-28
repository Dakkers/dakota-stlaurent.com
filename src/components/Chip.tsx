import type { CSSProperties } from "react";

type ChipIntent = "primary" | "secondary" | "neutral";
type ChipSize = "sm" | "md" | "lg";

const intentStyles: Record<ChipIntent, CSSProperties> = {
  primary: {
    background: "var(--primary-900)",
    border: "1px solid color-mix(in oklab, var(--primary-500) 20%, transparent)",
    color: "var(--primary-400)",
  },
  secondary: {
    background: "var(--secondary-900)",
    border: "1px solid color-mix(in oklab, var(--secondary-500) 20%, transparent)",
    color: "var(--secondary-400)",
  },
  neutral: {
    background: "var(--neutral-900)",
    border: "1px solid color-mix(in oklab, var(--neutral-500) 20%, transparent)",
    color: "var(--neutral-400)",
  },
};

const sizeClasses: Record<ChipSize, string> = {
  sm: "px-2 py-px text-xs",
  md: "px-2.5 py-0.5 text-xs",
  lg: "px-3 py-1 text-sm",
};

interface ChipProps {
  intent?: ChipIntent;
  size?: ChipSize;
  children: string;
}

export function Chip({ intent = "primary", size = "md", children }: ChipProps) {
  return (
    <span
      style={intentStyles[intent]}
      className={`inline-block rounded-full font-semibold ${sizeClasses[size]}`}
    >
      {children}
    </span>
  );
}
