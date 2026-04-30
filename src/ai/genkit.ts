import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import { config } from 'dotenv';

// Load local dev env first (used by Next.js), then fall back to .env.
config({ path: '.env.local' });
config();

const googleApiKey =
  process.env.GEMINI_API_KEY ??
  process.env.GOOGLE_API_KEY ??
  process.env.GOOGLE_GENAI_API_KEY;

export const ai = genkit({
  plugins: [googleAI({ apiKey: googleApiKey })],
  model: 'googleai/gemini-1.5-flash-latest',
});
