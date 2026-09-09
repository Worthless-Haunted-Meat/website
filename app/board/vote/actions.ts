"use server";

import { cookies, headers } from "next/headers";
import { Resend } from "resend";
import { getMotion } from "@/lib/motions";

interface VoteState {
  success: boolean;
  error: string;
}

const CHOICES = ["Aye", "Nay", "Abstain"] as const;

export async function castVote(
  _prev: VoteState,
  formData: FormData
): Promise<VoteState> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const choice = (formData.get("choice") as string)?.trim();
  const comment = (formData.get("comment") as string)?.trim() ?? "";
  const motionSlug = (formData.get("motionSlug") as string)?.trim();
  const acknowledged = formData.get("acknowledge") === "on";

  if (!name || !email) {
    return { success: false, error: "Full legal name and email are required." };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }
  if (!CHOICES.includes(choice as (typeof CHOICES)[number])) {
    return { success: false, error: "Please select Aye, Nay, or Abstain." };
  }
  if (!acknowledged) {
    return { success: false, error: "You must check the acknowledgment box to cast your vote." };
  }

  const motion = await getMotion(motionSlug);
  if (!motion) {
    return { success: false, error: "This motion could not be found." };
  }
  if (motion.meta.status !== "open") {
    return { success: false, error: "Voting on this motion has closed." };
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY not configured");
    return { success: false, error: "Could not record your vote. Please email us directly." };
  }

  const token = (await cookies()).get("whm-board-token")?.value ?? "";
  const inviteName = token.startsWith("invite:") ? token.slice("invite:".length) : "(none)";
  const userAgent = (await headers()).get("user-agent") ?? "(unknown)";
  const votedAt = new Date().toISOString();

  const record = [
    `BOARD VOTE RECORD`,
    ``,
    `Motion: ${motion.meta.title}`,
    `Motion number: ${motion.meta.number}`,
    `Vote: ${choice.toUpperCase()}`,
    `Voter (typed full legal name): ${name}`,
    `Voter email: ${email}`,
    `Invite identity (portal cookie): ${inviteName}`,
    `Voted at (UTC): ${votedAt}`,
    `User agent: ${userAgent}`,
    `Comment: ${comment || "(none)"}`,
    ``,
    `The voter checked the acknowledgment box confirming they read the motion,`,
    `are a director of Worthless Haunted Meat, and intend the typed name above`,
    `to serve as their electronic signature on this vote under the Texas Uniform`,
    `Electronic Transactions Act and the federal E-SIGN Act.`,
    ``,
    `---- FULL TEXT OF MOTION VOTED ON ----`,
    ``,
    motion.raw,
  ].join("\n");

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "WHM Board Portal <noreply@worthlesshauntedmeat.org>",
    to: ["worthlesshauntedmeat@gmail.com"],
    cc: [email],
    replyTo: email,
    subject: `VOTE ${choice.toUpperCase()}: ${motion.meta.number} — ${name}`,
    text: record,
  });

  if (error) {
    console.error("Resend error:", error);
    return { success: false, error: "Something went wrong recording your vote. Please try again." };
  }

  console.log(`[BOARD VOTE] "${name}" <${email}> voted ${choice} on "${motion.meta.title}" at ${votedAt} (invite: ${inviteName})`);
  return { success: true, error: "" };
}
