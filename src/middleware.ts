import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const isAuth = !!token;
        const isAdminPage = req.nextUrl.pathname.startsWith("/admin");
        const isVendorPage = req.nextUrl.pathname.startsWith("/dashboard/vendor") || req.nextUrl.pathname.startsWith("/leads");

        if (isAdminPage && token?.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }

        // Add role-specific protections here if needed
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/budget/:path*",
        "/rfps/:path*",
        "/calendar/:path*",
        "/messages/:path*",
        "/analytics/:path*",
        "/admin/:path*",
        "/dream-canvas/:path*",
    ],
};
