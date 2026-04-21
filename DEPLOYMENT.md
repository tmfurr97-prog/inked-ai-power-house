# Deployment Map — Inked AI Powerhouse

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                        CLIENT                           │
│              Next.js 16 App Router (React 19)           │
│         Tailwind CSS + Radix UI (shadcn/ui)             │
└────────────────────────┬────────────────────────────────┘
                         │ Server Actions / API Routes
┌────────────────────────▼────────────────────────────────┐
│                    AI LAYER (Genkit)                    │
│         Google Genkit 1.28 + @genkit-ai/next            │
│                                                         │
│  Flows:                                                 │
│  • novel-co-writer          • generate-course-outline   │
│  • write-personalized-letter• edit-course-content       │
│  • generate-business-form   • generate-relevant-media   │
│  • summarize-document       • generate-image            │
│  • generate-business-idea   • generate-prompt-suggestion│
│  • extract-text-from-image                              │
└────────────────────────┬────────────────────────────────┘
                         │ API calls
┌────────────────────────▼────────────────────────────────┐
│               Google AI (Gemini models)                 │
│            via GOOGLE_GENAI_API_KEY                     │
└─────────────────────────────────────────────────────────┘
```

---

## Environment Variables

Create a `.env.local` file at the project root. **Never commit this file.**

| Variable              | Required | Description                                      |
| --------------------- | -------- | ------------------------------------------------ |
| `GOOGLE_GENAI_API_KEY`| ✅ Yes   | Google AI Studio API key for Gemini model access |
| `NEXT_PUBLIC_APP_URL` | Optional | Full public URL of the deployed app              |
| `DATABASE_URL`        | ✅ Yes   | Prisma DB URL (SQLite local, Postgres in prod)   |
| `AUTH_SECRET`         | ✅ Yes   | Secret used to sign Auth.js session tokens       |
| `AUTH_GOOGLE_ID`      | Optional | Google OAuth client ID for social login          |
| `AUTH_GOOGLE_SECRET`  | Optional | Google OAuth client secret for social login      |

Obtain a Google AI API key at [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey).

---

## Local Development

```bash
# Install dependencies
pnpm install

# Set up environment
cp .env.local.example .env.local   # then fill in your API key

# Generate Prisma client and initialize local DB
pnpm db:generate
pnpm db:migrate --name init

# Start Next.js dev server (port 9002)
pnpm dev

# (Optional) Start Genkit dev UI in a separate terminal
pnpm genkit:dev
```

App available at: `http://localhost:9002`  
Genkit dev UI available at: `http://localhost:4000`

---

## Build & Production

```bash
# Type-check
pnpm typecheck

# Lint
pnpm lint

# Production build
pnpm build

# Start production server
pnpm start
```

---

## Deployment Options

### Option 1 — Vercel (Recommended)

Vercel is the simplest path for Next.js App Router with server actions.

1. Push the repository to GitHub.
2. Import the project at [https://vercel.com/new](https://vercel.com/new).
3. Set environment variables in the Vercel dashboard:
   - `GOOGLE_GENAI_API_KEY`
  - `DATABASE_URL`
  - `AUTH_SECRET`
  - `AUTH_GOOGLE_ID` (if using Google sign-in)
  - `AUTH_GOOGLE_SECRET` (if using Google sign-in)
4. Deploy. Vercel auto-detects Next.js and configures builds.

**Notes:**
- Genkit AI flows run as Next.js Server Actions — no separate backend needed.
- Default serverless function timeout is 10s; increase to 60s in `vercel.json` for long AI flows if needed.

```json
// vercel.json (optional)
{
  "functions": {
    "src/app/**": {
      "maxDuration": 60
    }
  }
}
```

---

### Option 2 — Self-Hosted (Node.js)

```bash
# On the server:
pnpm install --frozen-lockfile
pnpm build

# Set env vars, then:
pnpm start   # runs on port 3000 by default
```

Use a reverse proxy (nginx, Caddy) in front for HTTPS and port 80/443.

---

## Image Domains

The following external image hosts are whitelisted in `next.config.ts`. Add others as needed:

| Host                    | Used For               |
| ----------------------- | ---------------------- |
| `placehold.co`          | Placeholder images     |
| `images.unsplash.com`   | Stock photography      |
| `picsum.photos`         | Random placeholder images |

---

## Health Check

After deploying, verify these routes load correctly:

| Route                          | Expected Behavior              |
| ------------------------------ | ------------------------------ |
| `/`                            | Landing / dashboard            |
| `/tools/writer`                | Novel co-writer tool           |
| `/tools/forms`                 | Business form creator          |
| `/tools/summarizer`            | Document summarizer            |
| `/tools/courses`               | SME course designer            |
| `/admin`                       | Admin panel                    |
| `/pro`                         | Pro/upgrade page               |

---

## Security Checklist Before Going Live

- [ ] `GOOGLE_GENAI_API_KEY` is set in hosting environment secrets (not hardcoded)
- [ ] `.env.local` is in `.gitignore`
- [ ] `typescript.ignoreBuildErrors` in `next.config.ts` is reviewed/removed for production
- [ ] Rate limiting applied to AI flow endpoints if publicly accessible
- [ ] HTTPS enforced on the hosting platform
