import express from "express";
import { verifyGoogleChatRequest } from "./googleChatAuth.js";
import { sendToOpenClaw } from "./openclaw.js";

const app = express();
app.use(express.json({ limit: "1mb" }));

app.get("/healthz", (_req, res) => {
  res.json({ ok: true });
});

app.post("/google-chat", async (req, res) => {
  const auth = await verifyGoogleChatRequest(req);
  if (!auth.ok) {
    console.warn("Rejected Google Chat request:", auth.reason);
    return res.status(401).json({ text: "Unauthorized" });
  }

  const event = req.body || {};
  const type = event.type;

  if (type === "ADDED_TO_SPACE") {
    return res.json({ text: "Đã kết nối OpenClaw. Nhắn mình việc cần làm nhé." });
  }

  if (type === "REMOVED_FROM_SPACE") {
    return res.status(204).send();
  }

  const text = event.message?.argumentText || event.message?.text || "";
  if (!text.trim()) {
    return res.json({ text: "Mình chưa thấy nội dung cần xử lý." });
  }

  try {
    const reply = await sendToOpenClaw({
      message: text.trim(),
      user: event.user,
      space: event.space,
      thread: event.message?.thread
    });

    return res.json({
      text: String(reply).slice(0, 3900)
    });
  } catch (error) {
    console.error(error);
    return res.json({
      text: "OpenClaw đang chưa trả lời được. Kiểm tra bridge URL/token rồi thử lại nha."
    });
  }
});

const port = Number(process.env.PORT || 8080);
app.listen(port, () => {
  console.log(`Google Chat OpenClaw bot listening on :${port}`);
});
