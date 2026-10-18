import { OAuth2Client } from "google-auth-library";

const CHAT_ISSUER = "chat@system.gserviceaccount.com";
const client = new OAuth2Client();

export async function verifyGoogleChatRequest(req) {
  if (process.env.VERIFY_GOOGLE_CHAT === "false") {
    return { ok: true, skipped: true };
  }

  const audience = process.env.GOOGLE_CHAT_AUDIENCE;
  if (!audience) {
    return { ok: false, reason: "GOOGLE_CHAT_AUDIENCE is not configured" };
  }

  const header = req.get("authorization") || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match) {
    return { ok: false, reason: "Missing Google Chat bearer token" };
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: match[1],
      audience
    });
    const payload = ticket.getPayload();

    if (payload?.email !== CHAT_ISSUER) {
      return { ok: false, reason: "Bearer token was not issued for Google Chat" };
    }

    return { ok: true, payload };
  } catch (error) {
    return { ok: false, reason: error.message };
  }
}
