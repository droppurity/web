import { type NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { compareSync } from 'bcryptjs';

export async function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    if (!authValue) {
      return new NextResponse('Authentication required.', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
      });
    }
    const [username, password] = Buffer.from(authValue, 'base64').toString().split(':');

    try {
      const client = await connectToDatabase();
      const db = client.db('droppurity-db');
      const admin = await db.collection('admins').findOne({ username: username });

      // Check if admin exists and then compare the hashed password
      if (admin && admin.password && compareSync(password, admin.password)) {
        return NextResponse.next();
      }
    } catch (error) {
      console.error('Database connection or authentication error:', error);
      // Avoid leaking error details to the client
      return new NextResponse('Internal Server Error.', { status: 500 });
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
