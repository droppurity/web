import { type NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [username, password] = Buffer.from(authValue, 'base64').toString().split(':');

    if (username === 'lucky17031') {
      try {
        const client = await connectToDatabase();
        const db = client.db('droppurity-db');
        const adminUser = await db.collection('admins').findOne({ username });

        // WARNING: In a real production application, you should always hash passwords
        // and compare the hash. Storing and comparing plaintext passwords is not secure.
        if (adminUser && adminUser.password === password) {
          return NextResponse.next();
        }
      } catch (error) {
        console.error("Middleware authentication error:", error);
        return new NextResponse('Authentication database error.', { status: 500 });
      }
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
