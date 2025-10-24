import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("appwrite-mind-care-session");
  const url = req.nextUrl.clone();

  const publicPath = ["/auth/sign-in", "/auth/sign-up"];

  if (publicPath.some((path) => url.pathname.startsWith(path))) {
    if (session) {
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  if (!session) {
    url.pathname = "/auth/sign-in";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
