import authConfig from "../auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);
export default auth(async (req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  const authRoutes = ["/sign-in", "/sign-up"];
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isApiRoute = nextUrl.pathname.includes("/api");
  if (isApiRoute) {
    return;
  }

  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(new URL("/", req.url));
  }

  if (isAuthRoute && !isLoggedIn) {
    return;
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
