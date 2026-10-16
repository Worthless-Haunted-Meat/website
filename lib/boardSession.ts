import { cookies } from "next/headers";
import { readSession, sessionSecret, SESSION_COOKIE, type BoardSession } from "@/lib/session";

export async function getBoardSession(): Promise<BoardSession | null> {
  return readSession((await cookies()).get(SESSION_COOKIE)?.value, sessionSecret());
}
