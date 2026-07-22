import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const DOCS_DIR = path.join(process.cwd(), "content/board-docs");

export interface BoardDocMeta {
  title: string;
  slug: string;
  order: number;
  description: string;
  signable: boolean;
}

export function listBoardDocs(): BoardDocMeta[] {
  if (!fs.existsSync(DOCS_DIR)) return [];
  return fs
    .readdirSync(DOCS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const { data } = matter(fs.readFileSync(path.join(DOCS_DIR, f), "utf8"));
      return {
        title: data.title as string,
        slug: data.slug as string,
        order: (data.order as number) ?? 99,
        description: (data.description as string) ?? "",
        signable: Boolean(data.signable),
      };
    })
    .sort((a, b) => a.order - b.order);
}

export async function getBoardDoc(
  slug: string
): Promise<{ meta: BoardDocMeta; html: string; raw: string } | null> {
  const doc = listBoardDocs().find((d) => d.slug === slug);
  if (!doc) return null;
  const file = fs
    .readdirSync(DOCS_DIR)
    .find((f) => matter(fs.readFileSync(path.join(DOCS_DIR, f), "utf8")).data.slug === slug);
  if (!file) return null;
  const { content } = matter(fs.readFileSync(path.join(DOCS_DIR, file), "utf8"));
  const processed = await remark().use(remarkHtml, { sanitize: false }).process(content);
  return { meta: doc, html: processed.toString(), raw: content };
}
