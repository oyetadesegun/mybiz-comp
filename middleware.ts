// import { auth } from "@/auth";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export async function middleware(req: NextRequest) {
//   const session = await auth();
//   console.log(session, "here")
//   // If no session, redirect to login
//   if (!session) {
//     const loginUrl = new URL("/login", req.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   if (session.user?.email)
//     return NextResponse.next();
// }

// export const config = {
//   // *: zero or more
//   // +: one or more
//   // ? : zero or one
//   matcher: [
//     '/users/:userId*',
//     '/dashboard'],
// }

import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await auth();
  const pathname = req.nextUrl.pathname;

  // console.log(session, "Session in middleware"); 
  // For debugging

  // 1. If no session, redirect to login
  // This applies to all routes defined in `config.matcher`
  if (!session) {
    const loginUrl = new URL("/login", req.url);
    // Optionally, add a callbackUrl to redirect back after successful login
    // loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // User is authenticated. Now, check roles.
  const userRole = session.user?.role; // Access the custom 'role' property

  // Define your roles (ensure these match what you store in your database/JWT)
  const ROLES = {
    ADMIN: "ADMIN",
    CUSTOMER_EXPERIENCE: "CUSTOMER_EXPERIENCE",
    USER: "USER", // Or whatever your default user role is
  };

  // 2. Role-based access control
  // Routes starting with /admin can only be accessed by ADMIN
  if (pathname.startsWith("/admin")) {
    if (userRole !== ROLES.ADMIN) {
      console.log(`Access denied: ${userRole} tried to access ${pathname}`);
      // Redirect to an unauthorized page or dashboard
      return NextResponse.redirect(new URL("/user/dashboard", req.url));
    }
  }
  // Routes starting with /staff can be accessed by CUSTOMER_EXPERIENCE and ADMIN
  else if (pathname.startsWith("/staff")) {
    if (userRole !== ROLES.CUSTOMER_EXPERIENCE && userRole !== ROLES.ADMIN) {
      console.log(`Access denied: ${userRole} tried to access ${pathname}`);
      return NextResponse.redirect(new URL("/user/dashboard", req.url));
    }
  }
  // Routes starting with /user can be accessed by All authenticated users
  // This means any user with a session (ADMIN, CUSTOMER_EXPERIENCE, USER) can access.
  // The initial `if (!session)` check already handles the authentication part.
  // So, no specific role check is strictly needed here unless you wanted to exclude
  // certain roles from '/user' routes, which is not the requirement.
  // else if (pathname.startsWith("/user")) {
  //   // No further role restriction needed, as long as authenticated.
  // }

  // For any other matched routes (like /dashboard or /user routes),
  // or if the role checks above passed, allow access.
  return NextResponse.next();
}

// 3. Configure the matcher to specify which routes the middleware should run on
export const config = {
  matcher: [
    '/admin/:path*',       // Matches /admin, /admin/dashboard, /admin/users, etc.
    '/staff/:path*',       // Matches /staff, /staff/customers, etc.
    '/user/:path*',        // Matches /user, /user/profile, /users/:userId, etc.
    '/dashboard',          // Your existing protected dashboard route
    // Add any other routes that require authentication but not specific role checks here
  ],
};