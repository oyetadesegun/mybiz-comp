
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { createUser, getUserByEmail } from "./services/user-services";
import { User } from "@prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async jwt({ token, user }) {

      let activeUser: User | null = null

      if (user?.email) {
        activeUser = await getUserByEmail(user.email);
        if (!activeUser) {
          activeUser = await createUser({
            email: user.email,
            name: user.name || ""
          })
        }
        token.role = activeUser.role;
        token.anything = "test"
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.role) {
        console.log(session.user)
        // const testUser = session.user as unknown as any
        session.user.role = token.role as string;
      }
      return session;
    },
    
  },
})