import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import api, { Api } from "@/_lib/api/api";

interface LoginResponseData {
    id: string;
    email: string;
    name?: string;
    role?: string | number;
    [key: string]: unknown;
}

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        // 5 days maximum...
        maxAge: 60 * 60 * 24 * 5
    },
    secret: process.env.AUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "credentials",
            id: "credentials",
            type: "credentials",
            authorize: async (credentials, req) => {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    const response = await api.post<LoginResponseData>(
                        Api.routes.auth.login,
                        {
                            email: credentials.email,
                            password: credentials.password,
                            role: credentials.role || 1, // Default to user role if not provided
                        },
                        {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    if (response?.status && response.data) {
                        return {
                            id: response.data.id || String(response.data.id),
                            email: response.data.email,
                            name: response.data.name || response.data.email,
                            role: response.data.role,
                        };
                    }

                    return null;
                } catch (error) {
                    console.error("Login error:", error);
                    return null;
                }
            },
            credentials: {
                email: {type: "email"},
                password: {type: "password"},
                role: {type: "text", optional: true}
            },
        }),
    ],
    callbacks: {
    }
};

