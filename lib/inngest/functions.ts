/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { inngest } from "@/lib/inngest/client";
import {NEWS_SUMMARY_EMAIL_PROMPT, PERSONALIZED_WELCOME_EMAIL_PROMPT} from "@/lib/inngest/prompts";
import { sendNewsSummaryEmail, sendWelcomeEmail } from "@/lib/nodemailer/index";
import { getAllUsersforNewsEmail } from "@/lib/actions/user.actions";
import { getWatchlistSymbolsByEmail } from "@/lib/actions/watchlist.actions";
import { getNews } from "@/lib/actions/finnhub.actions";
import { getFormattedTodayDate } from "@/lib/utils";

export const sendSignUpEmail = inngest.createFunction(
    { id: 'sign-up-email', triggers: [{ event: 'app/user.created' }] },
    async ({ event, step }: { event: any; step: any }) => {
        const userProfile = `
            - Country: ${event.data.country}
            - Investment goals: ${event.data.investmentGoals}
            - Risk Tolerance: ${event.data.riskTolerance}
            - Preferred Industry: ${event.data.preferredIndustry}
        `

        const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace('{{userProfile}}', userProfile);

        const response =await step.ai.infer('generate-welcome-intro', {
            model: step.ai.models.gemini({ model: 'gemini-2.5-flash-lite' }),
            body: {
                contents: [
                    {
                        role: 'user',
                        parts: [
                        {text: prompt}
                        ]
                    }
                
                ]
            }
        })

        await step.run('send-welcome-mail', async () => {
            const part = response.candidates?.[0]?.content?.parts?.[0];
            const introText = (part && 'text' in part ? part.text : null) || 'Thanks for joining Signalist. You now have the tools to track markets and make smarter moves';
            
            const { data : {email,name} } = event;
            return await sendWelcomeEmail({
                email,
                name,
                intro:introText
            })
        })

        return {
            success: true,
            message: 'Welcome email sent successfully'
        }
    }

);
// Cron schedule notes
// Format : min hour dayofMonth month dayofWeek
// For example, '0 12 * * *' means every day at 12:00 PM (noon)
// Timezone: Inngest uses UTC time for cron schedules, so adjust accordingly if you want it to run at a specific local time.
// 12:00 UTC = 5:00 PDT/ 8:00 EDT/ 1:00 BST / 2:00 CEST
// Every day at 09:30 UTC would be '30 9 * * *'
// -Tip: for region-specific , either pick a UTC time that maps to your local hour , or run
// multiple functions per region if you need truly local delivery times

export const sendDailyNewsSummary = inngest.createFunction(
    { id: 'daily-news-summary', triggers: [{ event: 'app/send.daily.news' }, { cron: '0 12 * * *' }] },
    async ({ step }: { step: any }) => {
        //Step #1: get all users for news delivery
        const users = await step.run('get-all-users', getAllUsersforNewsEmail)
        
        if (!users || users.length === 0) return {
            success: false,
            message: 'No users found for news eemail'
        };
        //Step #2: Fetch personalized news for each user 
        const results = await step.run('fetch-user-news', async () => {
            const perUser: Array<{ user: UserForNewsEmail   ; articles: MarketNewsArticle[] }> = [];
            for (const user of users as UserForNewsEmail[]) {
                try {
                    const symbols = await getWatchlistSymbolsByEmail(user.email);
                    let articles = await getNews(symbols);
                    // Enforce max 6 articles per user
                    articles = (articles || []).slice(0, 6);
                    // If still empty, fallback to general
                    if (!articles || articles.length === 0) {
                        articles = await getNews();
                        articles = (articles || []).slice(0, 6);
                    }
                    perUser.push({ user, articles });
                } catch (e) {
                    console.error('daily-news: error preparing user news', user.email, e);
                    perUser.push({ user, articles: [] });
                }
            }
            return perUser;
        });
        //Step: #3: Summarize news using AI for each user
        const userNewsSummaries: { user: UserForNewsEmail; newsContent: string | null }[] = [];

        for (const { user, articles } of results) {
                try {
                    const prompt = NEWS_SUMMARY_EMAIL_PROMPT.replace('{{newsData}}', JSON.stringify(articles, null, 2));

                    const response = await step.ai.infer(`summarize-news-${user.email}`, {
                        model: step.ai.models.gemini({ model: 'gemini-2.5-flash-lite' }),
                        body: {
                            contents: [{ role: 'user', parts: [{ text:prompt }]}]
                        }
                    });

                    const part = response.candidates?.[0]?.content?.parts?.[0];
                    const newsContent = (part && 'text' in part ? part.text : null) || 'No market news.'

                    userNewsSummaries.push({ user, newsContent });
                } catch (e) {
                    console.error('Failed to summarize news for : ', user.email);
                    userNewsSummaries.push({ user, newsContent: null });
                }
            }
        //Step #4: Send email with news summary to each user

        await step.run('send-news-emails', async () => {
                await Promise.all(
                    userNewsSummaries.map(async ({ user, newsContent}) => {
                        if(!newsContent) return false;

                        return await sendNewsSummaryEmail({ email: user.email, date: getFormattedTodayDate(), newsContent })
                    })
                )
            })

        return { success: true, message: 'Daily news summary emails sent successfully' }
    }
);
