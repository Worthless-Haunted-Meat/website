// Records a signature that was captured before the ledger existed, from the
// plain-text copy of its signature email.
// Usage: node --env-file=.env.local scripts/import-signature.mjs <doc-slug> <record.txt>
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { put } from "@vercel/blob";

const [docSlug, file] = process.argv.slice(2);
if (!docSlug || !file) {
  console.error("Usage: node --env-file=.env.local scripts/import-signature.mjs <doc-slug> <record.txt>");
  process.exit(1);
}
if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error("BLOB_READ_WRITE_TOKEN is not set");
  process.exit(1);
}

const docPath = path.join("content/board-docs", `${docSlug}.md`);
const { data } = matter(fs.readFileSync(docPath, "utf8"));

const text = fs.readFileSync(file, "utf8");
const field = (label) => text.match(new RegExp(`^${label}:\\s*(.+)$`, "m"))?.[1].trim();
const name = field("Signer \\(typed full legal name\\)");
const email = field("Signer email");
const recordedAt = field("Signed at \\(UTC\\)");
const userAgent = field("User agent") ?? "(unknown)";
if (!name || !email || !recordedAt) {
  console.error("Could not find signer name, email and time in", file);
  process.exit(1);
}

const id = `import-${docSlug}-${name.toLowerCase().replace(/[^a-z]+/g, "-")}`;
const record = {
  type: "signature",
  docSlug,
  docTitle: data.title,
  docSha256: null,
  id,
  recordedAt,
  name,
  email,
  sessionKind: "invite",
  sessionName: null,
  userAgent,
  importedFrom: `signature email of ${recordedAt.slice(0, 10)}`,
};

const stamp = recordedAt.replace(/[:.]/g, "-");
await put(`ledger/${stamp}-signature-${id}.json`, JSON.stringify(record, null, 2), {
  access: "private",
  contentType: "application/json",
  addRandomSuffix: false,
  allowOverwrite: false,
});
console.log(`Recorded ${name}'s signature on "${data.title}" (${recordedAt})`);
