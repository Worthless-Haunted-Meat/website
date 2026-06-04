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
}

export interface Article extends ArticleMeta {
  contentHtml: string;
}

function extractFirstH1(content: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : "Untitled";
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
      excerpt: data.excerpt ?? extractFirstParagraph(content),
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

  const processed = await remark().use(remarkHtml, { sanitize: false }).process(content);
  const contentHtml = processed.toString();

  return {
    slug,
    title: data.title ?? extractFirstH1(content),
    author: data.author ?? "Ricardo Vega",
    date: data.date ?? "",
    excerpt: data.excerpt ?? extractFirstParagraph(content),
    contentHtml,
  };
}

export function getAllArticleSlugs(): string[] {
  const fileNames = fs
    .readdirSync(articlesDirectory)
    .filter((f) => f.endsWith(".md"));
  return fileNames.map((f) => f.replace(/\.md$/, "").replace(/^\d+-/, ""));
}
