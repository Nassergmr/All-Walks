import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/components/authComponents/schemas/loginSchema";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        if (!credentials) return null;

        const validatedData = LoginSchema.safeParse(credentials);
        if (!validatedData.success) return null;

        const { email, password } = validatedData.data;

        const user = await prisma.user.findFirst({
          where: { email },
        });

        if (!user || !user.password || !user.email) return null;

        const isValid = await compare(password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt", // Important for Credentials
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/sign-in", // optional but helpful
    error: "/sign-in", // redirect errors here
  },
} satisfies NextAuthConfig;
