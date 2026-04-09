import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connectToDatabase } from "@/database/mongoose";
import { nextCookies } from "better-auth/next-js";

const mongoose = await connectToDatabase();
const client = mongoose?.connection.getClient() as any;
const db = client?.db('user');

if (!db) throw new Error('MongoDB connection not found');

export const auth = betterAuth({
    database: mongodbAdapter(db),
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,
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