"use server";

import { cookies, headers } from "next/headers";
import { Resend } from "resend";
import { getBoardDoc } from "@/lib/boardDocs";

interface SignState {
  success: boolean;
  error: string;
}

export async function signConsent(
  _prev: SignState,
  formData: FormData
): Promise<SignState> {
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

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY not configured");
    return { success: false, error: "Could not submit signature. Please email us directly." };
  }

  const token = (await cookies()).get("whm-board-token")?.value ?? "";
  const inviteName = token.startsWith("invite:") ? token.slice("invite:".length) : "(none)";
  const userAgent = (await headers()).get("user-agent") ?? "(unknown)";
  const signedAt = new Date().toISOString();

  const record = [
    `ELECTRONIC SIGNATURE RECORD`,
    ``,
    `Document: ${doc.meta.title}`,
    `Signer (typed full legal name): ${name}`,
    `Signer email: ${email}`,
    `Invite identity (portal cookie): ${inviteName}`,
    `Signed at (UTC): ${signedAt}`,
    `User agent: ${userAgent}`,
    ``,
    `The signer checked the acknowledgment box confirming they read the document`,
    `and the Board Member Risks & Responsibilities disclosure, and intend the`,
    `typed name above to serve as their electronic signature under the Texas`,
    `Uniform Electronic Transactions Act and the federal E-SIGN Act.`,
    ``,
    `---- FULL TEXT OF SIGNED DOCUMENT ----`,
    ``,
    doc.raw,
  ].join("\n");

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "WHM Board Portal <noreply@worthlesshauntedmeat.org>",
    to: ["worthlesshauntedmeat@gmail.com"],
    cc: [email],
    replyTo: email,
    subject: `SIGNED: ${doc.meta.title} — ${name}`,
    text: record,
  });

  if (error) {
    console.error("Resend error:", error);
    return { success: false, error: "Something went wrong submitting your signature. Please try again." };
  }

  console.log(`[BOARD SIGN] "${name}" <${email}> signed "${doc.meta.title}" at ${signedAt} (invite: ${inviteName})`);
  return { success: true, error: "" };
}
