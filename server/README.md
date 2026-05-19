# Portfolio NestJS Server

Minimal NestJS backend for the portfolio project.

It provides:
- `POST /api/contact` - validates contact form data and sends it to Telegram.
- `GET /api/images` - returns available image files from `public/img`.
- `/static/img/<filename>` - serves image files from `public/img`.
- `GET /api/health` - basic health check.

## Install

```bash
cd server
npm install
```

## Environment

Create `.env` from `.env.example`:

```bash
cp .env.example .env
```

Required values:

```env
PORT=5000
NODE_ENV=development
SERVER_URL=http://localhost:5000
CLIENT_URL=http://localhost:3000
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

Do not commit real `.env` values.

## Telegram Setup

1. Open Telegram and message `@BotFather`.
2. Run `/newbot` and follow the prompts.
3. Copy the bot token into `TELEGRAM_BOT_TOKEN`.
4. Send a message to your bot.
5. Get your chat id from `https://api.telegram.org/bot<token>/getUpdates`.
6. Put the chat id into `TELEGRAM_CHAT_ID`.

If Telegram env values are missing, the server keeps running and `POST /api/contact` returns a service error.

## Run

```bash
npm run start:dev
```

Production build:

```bash
npm run build
npm run start:prod
```

## Endpoints

Health:

```bash
curl http://localhost:5000/api/health
```

Contact:

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","message":"Hello from portfolio form"}'
```

Images list:

```bash
curl http://localhost:5000/api/images
```

Static image:

```text
http://localhost:5000/static/img/partfolio_0.jpg
```

## Images

Place frontend images in:

```text
server/public/img
```

Allowed extensions:

```text
.jpg, .jpeg, .png, .webp, .gif
```

`GET /api/images` returns filenames and public URLs based on `SERVER_URL`.

## Frontend

In `client_next`, create:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

The contact form posts to:

```text
POST ${NEXT_PUBLIC_API_URL}/api/contact
```

Project images are loaded from:

```text
${NEXT_PUBLIC_API_URL}/static/img/<filename>
```

## Security

- Helmet security headers.
- CORS restricted to `CLIENT_URL`.
- Global validation with whitelist, forbidden extra fields, and transform.
- Rate limit through `@nestjs/throttler`, with stricter limit on contact.
- Production error responses do not expose stack traces.
- Telegram token is read only from environment variables and is never logged.
