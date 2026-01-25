
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { compare } from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    const client = await connectToDatabase();
    const db = client.db('droppurity-db');
    const admin = await db.collection('admins').findOne({ username });

    if (admin && admin.password) {
      const isPasswordCorrect = await compare(password, admin.password);
      if (isPasswordCorrect) {
        // Credentials are valid
        return NextResponse.json({ success: true }, { status: 200 });
      }
    }
    
    // Credentials are not valid
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  } catch (error) {
    console.error('API Auth Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
