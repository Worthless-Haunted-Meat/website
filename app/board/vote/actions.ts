"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { getBoardSession } from "@/lib/boardSession";
import { appendRecord, ledgerConfigured, sha256 } from "@/lib/ledger";
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
  const session = await getBoardSession();
  if (!session) {
    return { success: false, error: "Your board portal session has expired. Please sign in again." };
  }

  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const choice = (formData.get("choice") as string)?.trim() as (typeof CHOICES)[number];
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
  if (!CHOICES.includes(choice)) {
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

  if (!ledgerConfigured()) {
    console.error("BLOB_READ_WRITE_TOKEN not configured");
    return { success: false, error: "Could not record your vote. Please email us directly." };
  }

  const userAgent = (await headers()).get("user-agent") ?? "(unknown)";
  const motionSha256 = sha256(motion.raw);

  let votedAt: string;
  try {
    const saved = await appendRecord({
      type: "vote",
      motionSlug: motion.meta.slug,
      motionNumber: motion.meta.number,
      motionTitle: motion.meta.title,
      motionSha256,
      choice,
      comment,
      name,
      email,
      sessionKind: session.kind,
      sessionName: session.name,
      userAgent,
    });
    votedAt = saved.recordedAt;
  } catch (e) {
    console.error("Ledger write failed:", e);
    return { success: false, error: "Something went wrong recording your vote. Please try again." };
  }

  const record = [
    `BOARD VOTE RECORD`,
    ``,
    `Motion: ${motion.meta.title}`,
    `Motion number: ${motion.meta.number}`,
    `Motion version (SHA-256): ${motionSha256}`,
    `Vote: ${choice.toUpperCase()}`,
    `Voter (typed full legal name): ${name}`,
    `Voter email: ${email}`,
    `Portal identity: ${session.name ?? `(${session.kind} login)`}`,
    `Voted at (UTC): ${votedAt}`,
    `User agent: ${userAgent}`,
    `Comment: ${comment || "(none)"}`,
    ``,
    `The voter checked the acknowledgment box confirming they read the motion,`,
    `are a director of Worthless Haunted Meat, and intend the typed name above`,
    `to serve as their electronic signature on this vote under the Texas Uniform`,
    `Electronic Transactions Act and the federal E-SIGN Act.`,
    ``,
    `This vote is recorded in the board ledger at worthlesshauntedmeat.org/board/ledger.`,
    ``,
    `---- FULL TEXT OF MOTION VOTED ON ----`,
    ``,
    motion.raw,
  ].join("\n");

  if (process.env.RESEND_API_KEY) {
    const { error } = await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: "WHM Board Portal <noreply@worthlesshauntedmeat.org>",
      to: ["worthlesshauntedmeat@gmail.com"],
      cc: [email],
      replyTo: email,
      subject: `VOTE ${choice.toUpperCase()}: ${motion.meta.number} — ${name}`,
      text: record,
    });
    if (error) console.error("Resend error (vote is saved in the ledger):", error);
  } else {
    console.error("RESEND_API_KEY not configured (vote is saved in the ledger)");
  }

  console.log(`[BOARD VOTE] "${name}" <${email}> voted ${choice} on "${motion.meta.title}" at ${votedAt} (portal: ${session.name ?? session.kind})`);
  revalidatePath("/board", "layout");
  return { success: true, error: "" };
}
