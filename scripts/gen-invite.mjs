#!/usr/bin/env node
import { createHmac } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadEnv() {
  const envPath = resolve(process.cwd(), ".env.local");
  try {
    for (const line of readFileSync(envPath, "utf8").split("\n")) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  } catch {}
}

function b64url(buf) {
  return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

loadEnv();

const name = process.argv.slice(2).join(" ").trim();
if (!name) {
  console.error("Usage: pnpm invite \"<Full Name>\"");
  process.exit(1);
}

const secret = process.env.BOARD_INVITE_SECRET;
if (!secret) {
  console.error("BOARD_INVITE_SECRET not set. Add it to .env.local (same value as Vercel).");
  process.exit(1);
}

const base = process.env.INVITE_BASE_URL ?? "https://worthlesshauntedmeat.org";
const payload = b64url(Buffer.from(name, "utf8"));
const sig = b64url(createHmac("sha256", secret).update(payload).digest());
const token = `${payload}.${sig}`;

console.log(`\nInvite for: ${name}`);
console.log(`${base}/board?invite=${token}\n`);
