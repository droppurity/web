
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { compare } from 'bcryptjs';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

const SECRET_KEY = process.env.JWT_SECRET || 'your-default-secret-key-change-in-prod';
const key = new TextEncoder().encode(SECRET_KEY);

export async function POST(req: Request) {
    try {
        const { username, password, deviceId } = await req.json();

        if (!username || !password || !deviceId) {
            return NextResponse.json({ error: 'Username, password, and device ID are required' }, { status: 400 });
        }

        const client = await connectToDatabase();
        const db = client.db('droppurity-db');
        const admin = await db.collection('admins').findOne({ username });

        if (!admin) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const isPasswordCorrect = await compare(password, admin.password);
        if (!isPasswordCorrect) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Check device verification
        const allowedDevices = admin.allowed_devices || [];
        if (!allowedDevices.includes(deviceId)) {
            return NextResponse.json({
                error: 'Device not verified',
                deviceUnverified: true
            }, { status: 403 });
        }

        // Credentials & Device ID are valid -> Create Session
        // We'll use a JWT stored in an HTTP-only cookie
        const token = await new SignJWT({ username: admin.username, deviceId })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('24h') // Session valid for 24 hours
            .sign(key);

        const cookieStore = await cookies();
        cookieStore.set('admin_session', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 24 hours
            path: '/',
        });

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error('API Auth Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
