import { Chip } from "@/components/Chip";

const MUSIC_CATS = new Set([
  "music",
  "songwriting",
  "arranging",
  "producing",
  "composing",
  "music theory",
]);
const SCHOOL_CATS = new Set(["school"]);

function getIntentForCategory(cat: string): "primary" | "secondary" | "neutral" {
  const c = cat.toLowerCase();
  if (MUSIC_CATS.has(c)) return "secondary";
  if (SCHOOL_CATS.has(c)) return "primary";
  return "neutral";
}

interface CategoryChipsProps {
  categories: string[];
  className?: string;
}

export function CategoryChips({ categories, className }: CategoryChipsProps) {
  if (categories.length === 0) return null;
  return (
    <div className={`flex flex-wrap gap-1.5${className ? ` ${className}` : ""}`}>
      {categories.map((cat) => (
        <Chip key={cat} intent={getIntentForCategory(cat)}>
          {cat}
        </Chip>
      ))}
    </div>
  );
}
