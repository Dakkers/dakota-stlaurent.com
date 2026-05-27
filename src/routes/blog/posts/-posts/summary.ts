export interface Post {
  slug: string;
  title: string;
  date: Date;
  categories: string[];
  content: string;
  excerpt: string;
}

function parseFrontmatter(raw: string): { title: string; date: Date; categories: string[] } | null {
  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) return null;

  const fm = fmMatch[1];

  const titleMatch = fm.match(/^title:\s*(.*?)\s*$/m);
  const dateMatch = fm.match(/^date:\s*(.+?)\s*$/m);
  const categoriesMatch = fm.match(/^categories:\s*(.+?)\s*$/m);

  let title = titleMatch?.[1]?.trim() ?? "";
  if (title.startsWith('"') && title.endsWith('"')) {
    title = title.slice(1, -1);
  }

  const date = new Date(dateMatch?.[1]?.trim() ?? "");

  const categories = (categoriesMatch?.[1]?.trim() ?? "")
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);

  return { title, date, categories };
}

function extractContent(raw: string): string {
  return raw.replace(/^---[\s\S]*?---\r?\n/, "").trim();
}

const rawModules = import.meta.glob<string>("./*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export const allPosts: Post[] = Object.entries(rawModules)
  .flatMap(([path, raw]) => {
    const fm = parseFrontmatter(raw);
    if (!fm) return [];
    return [
      {
        slug: path.slice(2, -3), // strip './' prefix and '.md' suffix
        title: fm.title,
        date: fm.date,
        categories: fm.categories,
        content: extractContent(raw),
        excerpt: extractContent(raw).replace(/^(.{0,200})\s.*$/s, "$1"),
      },
    ];
  })
  .sort((a, b) => b.date.getTime() - a.date.getTime());

export interface PageResult {
  items: Post[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export class PostQuery {
  constructor(private readonly items: Post[]) {}

  filterByCategory(categories: string | string[]): PostQuery {
    const targets = (Array.isArray(categories) ? categories : [categories]).map((c) =>
      c.toLowerCase().trim(),
    );
    return new PostQuery(
      this.items.filter((p) => p.categories.some((c) => targets.includes(c.toLowerCase()))),
    );
  }

  filterByTitle(query: string): PostQuery {
    const q = query.toLowerCase();
    return new PostQuery(this.items.filter((p) => p.title.toLowerCase().includes(q)));
  }

  sortByDate(direction: "asc" | "desc" = "desc"): PostQuery {
    const sorted = [...this.items].sort((a, b) => {
      const diff = a.date.getTime() - b.date.getTime();
      return direction === "desc" ? -diff : diff;
    });
    return new PostQuery(sorted);
  }

  groupByCategory(): Record<string, Post[]> {
    const groups: Record<string, Post[]> = {};
    for (const post of this.items) {
      for (const category of post.categories) {
        (groups[category] ??= []).push(post);
      }
    }
    return groups;
  }

  all(): Post[] {
    return [...this.items];
  }

  first(): Post | undefined {
    return this.items[0];
  }

  paginate(page: number, perPage = 10): PageResult {
    const total = this.items.length;
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const safePage = Math.min(Math.max(1, page), totalPages);
    const start = (safePage - 1) * perPage;
    return {
      items: this.items.slice(start, start + perPage),
      page: safePage,
      perPage,
      total,
      totalPages,
      hasNext: safePage < totalPages,
      hasPrev: safePage > 1,
    };
  }

  count(): number {
    return this.items.length;
  }
}

export const posts = new PostQuery(allPosts);
