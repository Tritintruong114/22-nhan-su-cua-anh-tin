# Google Chat + OpenClaw Bot

MVP này biến Google Chat thành giao diện chat cho OpenClaw:

Google Chat -> Cloud Run HTTP endpoint -> OpenClaw session bridge -> Google Chat reply.

## Local Run

```bash
npm install
cp .env.example .env
npm run dev
```

Test local without Google verification:

```bash
curl -X POST http://localhost:8080/google-chat \
  -H 'content-type: application/json' \
  -d '{
    "type": "MESSAGE",
    "message": {"text": "hello from google chat"},
    "user": {"displayName": "Local Tester"},
    "space": {"displayName": "Local Space"}
  }'
```

## OpenClaw Bridge Contract

Set `OPENCLAW_SESSION_SEND_URL` to an endpoint that can call OpenClaw's `sessions_send` behavior. The bot sends:

```json
{
  "agentId": "main",
  "label": "google-chat",
  "timeoutSeconds": 25,
  "message": "Incoming Google Chat message..."
}
```

The bridge can return any of these shapes:

```json
{"reply":"..."}
{"message":"..."}
{"text":"..."}
{"result":{"reply":"..."}}
```

Keep `OPENCLAW_TOKEN` private. Do not put it in source control.

## Deploy to Cloud Run

```bash
gcloud run deploy google-chat-openclaw-bot \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars VERIFY_GOOGLE_CHAT=true,GOOGLE_CHAT_AUDIENCE=https://YOUR_CLOUD_RUN_URL/google-chat,OPENCLAW_SESSION_SEND_URL=https://YOUR_OPENCLAW_BRIDGE/sessions/send,OPENCLAW_AGENT_ID=main,OPENCLAW_SESSION_LABEL=google-chat
```

Then set the sensitive token separately:

```bash
gcloud run services update google-chat-openclaw-bot \
  --region us-central1 \
  --set-env-vars OPENCLAW_TOKEN=YOUR_TOKEN
```

## Google Chat App Setup

In Google Cloud Console:

1. Enable Google Chat API.
2. Configure the Chat app.
3. Set App URL to `https://YOUR_CLOUD_RUN_URL/google-chat`.
4. Set Authentication Audience to the same endpoint URL.
5. Install/test the app in Google Chat.

Google Chat sends a bearer token on each HTTP request. This service verifies that token with Google's OAuth client library and requires the issuer email to be `chat@system.gserviceaccount.com`.

## Production Notes

Google Chat expects fast HTTP responses. This MVP waits up to `OPENCLAW_TIMEOUT_SECONDS`; for long-running OpenClaw jobs, upgrade to an async flow:

1. Immediately respond "Đã nhận, đang xử lý".
2. Run OpenClaw in the background.
3. Use Google Chat API to post the final answer back to the same space/thread.
