import NextAuth from "next-auth";
import { DefaultSession, DefaultJWT } from "next-auth";

// Extend the Session and JWT types
declare module "next-auth" {
  interface Session {
    user: {
      role: string;
    } & DefaultSession["user"];
  }

  interface JWT extends DefaultJWT {
    role: string;
  }
}