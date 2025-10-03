import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // Redirect authenticated users trying to access auth pages
    if (pathname.startsWith("/auth/signin") && token) {
      if (token.role === "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      } else {
        return NextResponse.redirect(new URL("/capturar-numero", req.url));
      }
    }

    // Block USER access to admin-only routes
    if (token && token.role === "USER") {
      const adminOnlyRoutes = [
        "/dashboard",
        "/dashboard/users", 
        "/dashboard/reasons",
        "/dashboard/reports", 
        "/dashboard/settings"
      ];
      
      if (adminOnlyRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL("/capturar-numero", req.url));
      }
    }

    // Redirect ADMIN trying to access user-only routes
    if (token && token.role === "ADMIN") {
      const userOnlyRoutes = ["/capturar-numero", "/consultar-dnc"];
      
      if (userOnlyRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Allow access to auth pages
        if (pathname.startsWith("/auth/")) {
          return true;
        }
        
        // Allow access to home page
        if (pathname === "/") {
          return true;
        }

        // Require authentication for protected routes
        const protectedRoutes = [
          "/dashboard", 
          "/capturar-numero", 
          "/consultar-dnc",
          "/api/"
        ];

        if (protectedRoutes.some(route => pathname.startsWith(route))) {
          if (!pathname.startsWith("/api/auth/")) {
            return !!token;
          }
        }
        
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/capturar-numero/:path*", 
    "/consultar-dnc/:path*",
    "/api/:path*", 
    "/auth/:path*"
  ]
};
