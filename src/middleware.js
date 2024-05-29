import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(request) {
  const cookieStore = cookies();
  const currentUser = cookieStore.get("currentUser")?.value;

  if (currentUser) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/user",
    "/category/:path*",
    "/product/:path*",
    "/order/:path*",
  ],
};
