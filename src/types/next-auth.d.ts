import type { DefaultSession } from "next-auth";
import type { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      email: string;
      id: string | number;
      name: string;
      token: string;
      type: string;
    };
  }

  interface User {
    id: string | number;
    email: string;
    image?: never;
    token: string;
    type: string;
  }

  interface JWT {
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    token: string;
    id: string | number;
    type: string;
  }
}
