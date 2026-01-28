
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
  // Check for admin routes
  if (req.nextUrl.pathname.startsWith('/rajababuadmin')) {

    // Exception for the login page and static assets (if any)
    if (req.nextUrl.pathname === '/rajababuadmin/login') {
      return NextResponse.next();
    }

    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;

    if (token) {
      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-default-secret-key-change-in-prod');
        const { payload } = await jwtVerify(token, secret);

        // If verification succeeds, proceed
        // Optionally, we could pass the user/deviceId downstream via headers if needed
        return NextResponse.next();

      } catch (err) {
        // Token invalid or expired
        console.error("Token verification failed:", err);
      }
    }

    // Redirect to login if no valid token
    const url = req.nextUrl.clone();
    url.pathname = '/rajababuadmin/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/rajababuadmin/:path*'], // Protect the admin page and all its sub-paths
};
