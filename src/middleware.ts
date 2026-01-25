
import { type NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_USERNAME;
  const pass = process.env.ADMIN_PASSWORD;

  // If credentials are not set, deny access. This is a security measure.
  if (!user || !pass) {
    console.error("ADMIN_USERNAME or ADMIN_PASSWORD not set in environment variables.");
    return new NextResponse('Internal Server Error: Auth not configured.', { status: 500 });
  }

  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [username, password] = Buffer.from(authValue, 'base64').toString().split(':');

    if (username === user && password === pass) {
      return NextResponse.next();
    }
  }

  return new NextResponse('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  matcher: '/rajababuadmin',
};
