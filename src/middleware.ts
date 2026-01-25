import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { compare } from 'bcryptjs';

// This is crucial. It forces the middleware to run in the Node.js runtime,
// which is required by the 'mongodb' and 'bcryptjs' packages.
export const runtime = 'nodejs';

export async function middleware(req: NextRequest) {
  // We only want to protect the /rajababuadmin route
  if (req.nextUrl.pathname.startsWith('/rajababuadmin')) {
    const basicAuth = req.headers.get('authorization');

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      
      // Check if authValue is defined and not empty
      if (authValue) {
        try {
          const [username, password] = Buffer.from(authValue, 'base64').toString().split(':');

          const client = await connectToDatabase();
          const db = client.db('droppurity-db');
          const admin = await db.collection('admins').findOne({ username });

          if (admin && admin.password) {
            const isPasswordCorrect = await compare(password, admin.password);
            if (isPasswordCorrect) {
              // If credentials are correct, allow the request to proceed
              return NextResponse.next();
            }
          }
        } catch (error) {
          // This can happen if the base64 string is malformed or if there's a db error.
          // We log it and then fall through to the authentication challenge.
          console.error('Authentication error:', error);
        }
      }
    }

    // If authentication fails, is missing, or an error occurs, send a 401 response
    // and request Basic Authentication.
    return new NextResponse('Authentication required.', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  // For any other routes, just pass them through
  return NextResponse.next();
}

export const config = {
  matcher: '/rajababuadmin',
};
