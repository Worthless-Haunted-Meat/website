import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const MOTIONS_DIR = path.join(process.cwd(), "content/board-motions");

export interface MotionMeta {
  title: string;
  slug: string;
  number: string;
  status: "open" | "closed";
  opened: string;
  description: string;
  result: string;
}

function readMeta(file: string): MotionMeta {
  const { data } = matter(fs.readFileSync(path.join(MOTIONS_DIR, file), "utf8"));
  return {
    title: data.title as string,
    slug: data.slug as string,
    number: (data.number as string) ?? "",
    status: data.status === "closed" ? "closed" : "open",
    opened: (data.opened as string) ?? "",
    description: (data.description as string) ?? "",
    result: (data.result as string) ?? "",
  };
}

export function listMotions(): MotionMeta[] {
  if (!fs.existsSync(MOTIONS_DIR)) return [];
  return fs
    .readdirSync(MOTIONS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(readMeta)
    .sort((a, b) => a.number.localeCompare(b.number));
}

export async function getMotion(
  slug: string
): Promise<{ meta: MotionMeta; html: string; raw: string } | null> {
  if (!fs.existsSync(MOTIONS_DIR)) return null;
  const file = fs
    .readdirSync(MOTIONS_DIR)
    .filter((f) => f.endsWith(".md"))
    .find((f) => readMeta(f).slug === slug);
  if (!file) return null;
  const { content } = matter(fs.readFileSync(path.join(MOTIONS_DIR, file), "utf8"));
  const processed = await remark().use(remarkHtml, { sanitize: false }).process(content);
  return { meta: readMeta(file), html: processed.toString(), raw: content };
}
