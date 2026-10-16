"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { getBoardDoc } from "@/lib/boardDocs";
import { getBoardSession } from "@/lib/boardSession";
import { appendRecord, ledgerConfigured, sha256 } from "@/lib/ledger";

interface SignState {
  success: boolean;
  error: string;
}

export async function signConsent(
  _prev: SignState,
  formData: FormData
): Promise<SignState> {
  const session = await getBoardSession();
  if (!session) {
    return { success: false, error: "Your board portal session has expired. Please sign in again." };
  }

  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const agreed = formData.get("agree") === "on";
  const docSlug = (formData.get("docSlug") as string)?.trim();

  if (!name || !email) {
    return { success: false, error: "Full legal name and email are required." };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }
  if (!agreed) {
    return { success: false, error: "You must check the acknowledgment box to sign." };
  }

  const doc = await getBoardDoc(docSlug);
  if (!doc || !doc.meta.signable) {
    return { success: false, error: "This document cannot be signed online." };
  }

  if (!ledgerConfigured()) {
    console.error("BLOB_READ_WRITE_TOKEN not configured");
    return { success: false, error: "Could not submit signature. Please email us directly." };
  }

  const userAgent = (await headers()).get("user-agent") ?? "(unknown)";
  const docSha256 = sha256(doc.raw);

  let signedAt: string;
  try {
    const saved = await appendRecord({
      type: "signature",
      docSlug: doc.meta.slug,
      docTitle: doc.meta.title,
      docSha256,
      name,
      email,
      sessionKind: session.kind,
      sessionName: session.name,
      userAgent,
    });
    signedAt = saved.recordedAt;
  } catch (e) {
    console.error("Ledger write failed:", e);
    return { success: false, error: "Something went wrong submitting your signature. Please try again." };
  }

  const record = [
    `ELECTRONIC SIGNATURE RECORD`,
    ``,
    `Document: ${doc.meta.title}`,
    `Document version (SHA-256): ${docSha256}`,
    `Signer (typed full legal name): ${name}`,
    `Signer email: ${email}`,
    `Portal identity: ${session.name ?? `(${session.kind} login)`}`,
    `Signed at (UTC): ${signedAt}`,
    `User agent: ${userAgent}`,
    ``,
    ...(doc.meta.slug === "consent-to-serve"
      ? [
          `The signer checked the acknowledgment box confirming they read the document`,
          `and the Board Member Risks & Responsibilities disclosure, and intend the`,
          `typed name above to serve as their electronic signature under the Texas`,
          `Uniform Electronic Transactions Act and the federal E-SIGN Act.`,
        ]
      : [
          `The signer checked the acknowledgment box confirming they read the document,`,
          `are a director of Worthless Haunted Meat, and intend the typed name above to`,
          `serve as their electronic signature on this document under the Texas`,
          `Uniform Electronic Transactions Act and the federal E-SIGN Act.`,
        ]),
    ``,
    `This signature is recorded in the board ledger at worthlesshauntedmeat.org/board/ledger.`,
    ``,
    `---- FULL TEXT OF SIGNED DOCUMENT ----`,
    ``,
    doc.raw,
  ].join("\n");

  if (process.env.RESEND_API_KEY) {
    const { error } = await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: "WHM Board Portal <noreply@worthlesshauntedmeat.org>",
      to: ["worthlesshauntedmeat@gmail.com"],
      cc: [email],
      replyTo: email,
      subject: `SIGNED: ${doc.meta.title} — ${name}`,
      text: record,
    });
    if (error) console.error("Resend error (signature is saved in the ledger):", error);
  } else {
    console.error("RESEND_API_KEY not configured (signature is saved in the ledger)");
  }

  console.log(`[BOARD SIGN] "${name}" <${email}> signed "${doc.meta.title}" at ${signedAt} (portal: ${session.name ?? session.kind})`);
  revalidatePath("/board", "layout");
  return { success: true, error: "" };
}
