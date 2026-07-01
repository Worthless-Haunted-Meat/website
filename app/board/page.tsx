import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { notFound } from "next/navigation";
import BoardTabs from "@/components/BoardTabs";

export const metadata: Metadata = {
  title: "Board Portal",
  description: "For Worthless Haunted Meat board members and prospective board members.",
};

async function getBoardContent() {
  const filePath = path.join(process.cwd(), "content/board-member-invite.md");
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { content } = matter(raw);
  const processed = await remark().use(remarkHtml, { sanitize: false }).process(content);
  return processed.toString();
}

export default async function BoardPage() {
  const html = await getBoardContent();
  if (!html) notFound();

  return (
    <div className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-6">
          Board Portal
        </p>
        <BoardTabs activeHref="/board" />
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
