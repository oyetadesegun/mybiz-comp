
import NextAuth, { CredentialsSignin } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { createUser, getUserByEmail, updateLastLoggedIn } from "./actions/user/user.actions";
import { Role, User } from "@prisma/client";
import { bcryptCompare, bcryptHash } from "./actions/services/hash-service";

class CustomError extends CredentialsSignin {
  code: string;
  constructor(message: string, extras: Record<string, string> = {}) {
    const query = new URLSearchParams({ message, ...extras }).toString();
    super(query); // store everything in message/query string
    this.name = "CustomError";
    this.code = query;

  }
}


//TODO  use password supplied
export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        firstName: { label: "First Name", type: "text" },
        lastName: { label: "Last Name", type: "text" },
      },
      authorize: async (credentials) => {
        console.log(process.env.NEXTAUTH_SECRET)
        const { email, password, firstName, lastName } = credentials ?? {}

        console.log("Auth attempt:", { email, password, firstName, lastName })

        if (typeof email !== "string" || typeof password !== "string") {
          throw new CustomError("Supply Email and password");
        }

        const isSignupFlow =
          typeof firstName === "string" &&
          typeof lastName === "string" &&
          firstName.trim() !== "" &&
          lastName.trim() !== ""

        if (isSignupFlow) {
          // Signup flow
          const existing = await getUserByEmail(email)
          if (existing) {
            throw new CustomError("Emnail already exists", {
              email,
              firstName,
              lastName,
              password,
              mode: 'signup'
            });
          }

          const hashedPassword = await bcryptHash(password)

          const newUser = await createUser({
            email,
            name: `${firstName.trim()} ${lastName.trim()}`,
            password: hashedPassword,
            avatar: "/placeholder-user.jpg"
          })

          return newUser
        }


        // Login flow
        const user = await getUserByEmail(email)
        if (!user) {
          throw new CustomError("Email supplied not registered", {
            email, password
          });
        }

        if (!user.password) {
          // This case should ideally not happen if password is a required field
          throw new CustomError("Invalid Credentials: Login with google", {
            email, password
          });
        }

        const isPasswordValid = await bcryptCompare({
          password,
          hashedPassword: user.password,
        })

        console.log("here", isPasswordValid)

        if (!isPasswordValid) {
          throw new CustomError("Invalid Credentials supplied", {
            email, password
          });
        }
        await updateLastLoggedIn(user.id)

        return user
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {

      let activeUser: User | null = null

      if (user?.email) {
        activeUser = await getUserByEmail(user.email);
        if (!activeUser) {
          activeUser = await createUser({
            email: user.email,
            name: user.name || "",
            avatar: user.image || "",
          })
        }
        token.role = activeUser.role;
        token.anything = "test"
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.role) {
        // const testUser = session.user as unknown as any
        session.user.role = token.role as Role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth',
    error: "/login"
  }
})