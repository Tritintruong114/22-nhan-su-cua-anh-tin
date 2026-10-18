function extractReply(data) {
  if (!data) return null;
  if (typeof data === "string") return data;
  return (
    data.reply ||
    data.message ||
    data.text ||
    data.result?.reply ||
    data.result?.message ||
    data.result?.text ||
    data.output ||
    null
  );
}

export async function sendToOpenClaw({ message, user, space, thread }) {
  const url = process.env.OPENCLAW_SESSION_SEND_URL;
  if (!url) {
    throw new Error("OPENCLAW_SESSION_SEND_URL is not configured");
  }

  const timeoutSeconds = Number(process.env.OPENCLAW_TIMEOUT_SECONDS || 25);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutSeconds * 1000);

  const payload = {
    agentId: process.env.OPENCLAW_AGENT_ID || "main",
    label: process.env.OPENCLAW_SESSION_LABEL || "google-chat",
    timeoutSeconds,
    message: [
      "Incoming Google Chat message.",
      `User: ${user?.displayName || user?.name || "unknown"}`,
      `Space: ${space?.displayName || space?.name || "unknown"}`,
      `Thread: ${thread?.name || "none"}`,
      "",
      message
    ].join("\n")
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(process.env.OPENCLAW_TOKEN
          ? { authorization: `Bearer ${process.env.OPENCLAW_TOKEN}` }
          : {})
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    const raw = await response.text();
    const data = raw ? JSON.parse(raw) : null;

    if (!response.ok) {
      throw new Error(data?.error || data?.message || `OpenClaw returned ${response.status}`);
    }

    return extractReply(data) || "OpenClaw đã nhận tin nhắn, nhưng chưa trả về nội dung.";
  } finally {
    clearTimeout(timeout);
  }
}
