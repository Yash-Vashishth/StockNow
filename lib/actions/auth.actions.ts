/* eslint-disable @typescript-eslint/no-unused-vars */
'use server';

import { auth } from "@/lib/better-auth/auth";
import { inngest } from "@/lib/inngest/client";
import { success } from "better-auth";
import { headers } from "next/headers";


export const signUpWithEmail = async (data: SignUpFormData) => {
    try {
        const reqHeaders = Object.fromEntries((await headers()).entries());

        const response = await auth?.api.signUpEmail({
            body: {
                email: data.email,
                password: data.password,
                name: data.fullName,
                country: data.country,
                investmentGoals: data.investmentGoals,
                riskTolerance: data.riskTolerance,
                preferredIndustry: data.preferredIndustry
            } as any,
            headers: reqHeaders
        });

        console.log(response);

        if (response?.user) {
            await inngest.send({
                name: 'app/user.created',
                data: data
            });

            return {
                success: true,
                data: response
            };
        }

        throw new Error("Signup failed - no user returned");

    } catch (e: any) {
        return {
            success: false,
            error: e?.body?.message || e?.message || 'Sign up failed'
        };
    }
};

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
    
    try {
        const reqHeaders = await headers();        
        const response = await auth?.api.signInEmail({
            body: {
                email,
                password
            } as any,
            headers: reqHeaders
        });

        return {
            success: true,
            data: response
        }
        
    } catch (e) {
        return {
            success: false,
            error: 'Sign in failed'
        };
    }
}

export const signOut = async () => { 
    try {
        await auth?.api.signOut({headers: await headers()});        
    } catch (e) {
        console.log('Sign out failed',e);
        return {
            success: false,
            error: 'Sign out failed'
        }
    }
}