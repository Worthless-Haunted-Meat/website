"use server";

import { Resend } from "resend";

interface FormState {
  success: boolean;
  error: string;
}

export async function submitJoinForm(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const love = (formData.get("love") as string)?.trim();
  const help = (formData.get("help") as string)?.trim();

  if (!name || !email) {
    return { success: false, error: "Name and email are required." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY not configured");
    return { success: false, error: "Could not send message. Please email us directly." };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "WHM Website <noreply@worthlesshauntedmeat.org>",
    to: ["worthlesshauntedmeat@gmail.com"],
    replyTo: email,
    subject: `New coalition inquiry from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `What they love: ${love || "(not provided)"}`,
      `How they want to help: ${help || "(not provided)"}`,
    ].join("\n\n"),
  });

  if (error) {
    console.error("Resend error:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }

  return { success: true, error: "" };
}
