import { NextAuthOptions, type DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import api, { Api } from "@/_lib/api/api";
import type { LoginResponse } from "@/app/[locale]/auth/_types/auth.types";
import { string } from "zod";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    // 5 days maximum...
    maxAge: 60 * 60 * 24 * 5,
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
          const response = await api.post<LoginResponse>(
            Api.routes.auth.login,
            {
              email: credentials.email,
              password: credentials.password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          if (response?.status && response.data) {
            return {
              email: response.data.email,
              id: response.data.id,
              token: response.data.token,
              name: response.data.name,
              type: response?.data?.account_type?.toString(),
            };
          }

          return null;
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
        role: { type: "text", optional: true },
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.token = user.token;
        token.email = user.email;
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token && token.email) {
        session.user = {
          email: token.email,
          id: token.id,
          name: token.name as string,
          token: token.token,
          type: token.account_type as string,
        };
      }
      return session;
    },
  },
};
