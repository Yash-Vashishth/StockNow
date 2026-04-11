import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import { sendDailyNewsSummary, sendSignUpEmail } from "@/lib/inngest/functions";

console.log('Functions loaded:', { sendSignUpEmail: !!sendSignUpEmail, sendDailyNewsSummary: !!sendDailyNewsSummary });
console.log('Signing key:', !!process.env.INNGEST_SIGNING_KEY ? 'present' : 'MISSING');
console.log('Client ID:', inngest.id);

export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [sendSignUpEmail , sendDailyNewsSummary]
})