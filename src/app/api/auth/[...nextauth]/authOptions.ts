import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
                if(credentials?.email === "test@email.com" && credentials?.password === "P@ssword123") {
                    return {
                        id: "1",
                        email: "test@email.com",
                        name: "test account"
                    }
                }
                return null;
            },
            credentials: {
                email: {type: "email"},
                password: {type: "password"}
            },
        }),
    ],
    callbacks: {
    }
};

