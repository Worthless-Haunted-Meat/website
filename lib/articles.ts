import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const articlesDirectory = path.join(process.cwd(), "content/articles");

export interface ArticleMeta {
  slug: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  series: string | null;
  part: number | null;
  originalUrl: string | null;
  originalSource: string | null;
}

export interface Article extends ArticleMeta {
  contentHtml: string;
}

function extractFirstH1(content: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : "Untitled";
}

// Article files open with their own "# Title", "*By …*" byline and rule; the article page renders those itself.
function stripLeadingHeader(content: string): string {
  return content.replace(/^\s*#\s+.+\n+(?:\*By [^*\n]+\*\s*\n+)?(?:-{3,}[ \t]*\n+)?/, "");
}

function extractFirstParagraph(content: string): string {
  const lines = content.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && !trimmed.startsWith("---")) {
      return trimmed.replace(/\*([^*]+)\*/g, "$1").slice(0, 160);
    }
  }
  return "";
}

export function getAllArticles(): ArticleMeta[] {
  const fileNames = fs
    .readdirSync(articlesDirectory)
    .filter((f) => f.endsWith(".md"));

  const articles = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "").replace(/^\d+-/, "");
    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title ?? extractFirstH1(content),
      author: data.author ?? "Ricardo Vega",
      date: data.date ?? "",
      excerpt: data.excerpt ?? extractFirstParagraph(stripLeadingHeader(content)),
      series: (data.series as string) ?? null,
      part: typeof data.part === "number" ? data.part : null,
      originalUrl: (data.originalUrl as string) ?? null,
      originalSource: (data.originalSource as string) ?? null,
    };
  });

  return articles.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const fileNames = fs
    .readdirSync(articlesDirectory)
    .filter((f) => f.endsWith(".md"));

  const fileName = fileNames.find((f) => f.replace(/\.md$/, "").replace(/^\d+-/, "") === slug);
  if (!fileName) return null;

  const fullPath = path.join(articlesDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processed = await remark().use(remarkHtml, { sanitize: false }).process(stripLeadingHeader(content));
  const contentHtml = processed.toString();

  return {
    slug,
    title: data.title ?? extractFirstH1(content),
    author: data.author ?? "Ricardo Vega",
    date: data.date ?? "",
    excerpt: data.excerpt ?? extractFirstParagraph(stripLeadingHeader(content)),
    series: (data.series as string) ?? null,
    part: typeof data.part === "number" ? data.part : null,
    originalUrl: (data.originalUrl as string) ?? null,
    originalSource: (data.originalSource as string) ?? null,
    contentHtml,
  };
}

export function getAllArticleSlugs(): string[] {
  const fileNames = fs
    .readdirSync(articlesDirectory)
    .filter((f) => f.endsWith(".md"));
  return fileNames.map((f) => f.replace(/\.md$/, "").replace(/^\d+-/, ""));
}
