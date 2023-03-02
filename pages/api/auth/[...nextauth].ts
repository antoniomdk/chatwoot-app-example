import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "" },
        password: { label: "Password", type: "" },
      },
      async authorize(credentials, req) {
        if (
          credentials?.password !== process.env.PASSWORD ||
          credentials?.username !== process.env.USERNAME
        ) {
          return null;
        }
        return {
          id: "1",
          name: "admin",
          email: "admin@a<yourdomain>",
        };
      },
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin";
      return token;
    },
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        path: "/",
        httpOnly: true,
        // Change this to "lax" if your deploying on the same domain
        sameSite: "none",
        secure: true,
      },
    },
    callbackUrl: {
      name: `__Secure-next-auth.callback-url`,
      options: {
        path: "/",
        // Change this to "lax" if your deploying on the same domain
        sameSite: "none",
        secure: true,
      },
    },
    csrfToken: {
      name: `__Host-next-auth.csrf-token`,
      options: {
        path: "/",
        httpOnly: true,
        // Change this to "lax" if your deploying on the same domain
        sameSite: "none",
        secure: true,
      },
    },
  },
};

export default NextAuth(authOptions);
