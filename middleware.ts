import { withAuth } from "next-auth/middleware";

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  callbacks: {
    authorized({ token }) {
      return !!token;
    },
  },
});

// Protecting all pages except the API routes and static assets
export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};

