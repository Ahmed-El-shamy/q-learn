import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            id: "credentials",
            type: "credentials",
            authorize: async (credentials, req) => {
                if(credentials?.email === "test@email.com" && credentials?.password === "password") {
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
});

export {handler as POST, handler as GET};