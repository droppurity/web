
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/rajababuadmin')) {
    const basicAuth = req.headers.get('authorization');

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      if (authValue) {
        const [user, pwd] = Buffer.from(authValue, 'base64').toString().split(':');

        // The URL for our internal authentication-checking API route
        const url = req.nextUrl.clone();
        url.pathname = '/api/auth/admin';

        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: user, password: pwd }),
          });
          
          // If the credentials are valid (API returns a 2xx status), let the request through
          if (response.ok) {
            return NextResponse.next();
          }
        } catch (error) {
            console.error('Error calling auth API from middleware:', error);
            // Fall through to the authentication challenge below
        }
      }
    }
    
    // If authentication is missing or invalid, send the 401 challenge to the browser
    return new NextResponse('Authentication required.', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/rajababuadmin/:path*'], // Protect the admin page and all its sub-paths
};
