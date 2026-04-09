import { Inngest } from "inngest";

export const inngest = new Inngest({
    id: 'stocknow',
    ai: { gemini: { apiKey: process.env.GEMINI_API_KEY } }
})