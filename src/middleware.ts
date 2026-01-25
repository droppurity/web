
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { compare } from 'bcryptjs';

// This is crucial to use Node.js APIs in middleware
export const runtime = 'nodejs';

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/rajababuadmin')) {
    const basicAuth = req.headers.get('authorization');

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      if (authValue) {
          const [username, password] = Buffer.from(authValue, 'base64').toString().split(':');

          try {
              const client = await connectToDatabase();
              const db = client.db('droppurity-db');
              const admin = await db.collection('admins').findOne({ username: username });

              if (admin && admin.password) {
                  const isPasswordCorrect = await compare(password, admin.password);
                  if (isPasswordCorrect) {
                      return NextResponse.next();
                  }
              }
          } catch (error) {
              console.error('Middleware database error:', error);
              // Fall through to return 401
          }
      }
    }
    
    // If authentication fails or is missing, request it.
    const url = req.nextUrl;
    url.pathname = '/api/auth-challenge';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/rajababuadmin',
};
