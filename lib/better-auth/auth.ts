import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connectToDatabase } from "@/database/mongoose";
import { nextCookies } from "better-auth/next-js";

const mongoose = await connectToDatabase();
const client = mongoose?.connection.getClient() as any;
const db = client?.db('user');

if (!db) throw new Error('MongoDB connection not found');

const getBaseURL = () => {
    let url = process.env.BETTER_AUTH_URL;
    if (!url || url.includes("localhost")) {
        // If deployed on Vercel but the env var is either missing or stuck on localhost:
        if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
            url = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
        } else if (process.env.VERCEL_URL) {
            url = `https://${process.env.VERCEL_URL}`;
        } else {
            url = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        }
    }
    return url;
}

export const auth = betterAuth({
    database: mongodbAdapter(db),
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: getBaseURL(),
    user: {
        modelName: "signindata",
        additionalFields: {
            country: { type: "string", required: false },
            investmentGoals: { type: "string", required: false },
            riskTolerance: { type: "string", required: false },
            preferredIndustry: { type: "string", required: false }
        }
    },
    emailAndPassword: {
        enabled: true,
        disableSignUp: false,
        requireEmailVerification: false,
        minPasswordLength: 8,
        maxPasswordLength: 128,
        autoSignIn: true,
    },
    plugins: [nextCookies()],
});