'use server';

import { z } from 'zod';
import { connectToDatabase } from '@/lib/mongodb';
import { hash } from 'bcryptjs';

const AdminSetupSchema = z.object({
  username: z.string().min(1, { message: "Username is required." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export async function setupAdmin(data: z.infer<typeof AdminSetupSchema>) {
  try {
    const validation = AdminSetupSchema.safeParse(data);
    if (!validation.success) {
      const firstError = Object.values(validation.error.flatten().fieldErrors).flat()[0] || 'Invalid data provided.';
      return { success: false, message: firstError };
    }
    
    const client = await connectToDatabase();
    const db = client.db('droppurity-db');
    const adminCollection = db.collection('admins');

    // Check if an admin with this username already exists.
    const existingAdmin = await adminCollection.findOne({ username: validation.data.username });
    if (existingAdmin) {
      // To prevent creating duplicate admins, we'll just update the password.
      const hashedPassword = await hash(validation.data.password, 10);
      await adminCollection.updateOne(
        { username: validation.data.username },
        { $set: { password: hashedPassword, updatedAt: new Date() } }
      );
       return { success: true, message: 'Admin user already existed. Password has been updated.' };
    }

    const hashedPassword = await hash(validation.data.password, 10);

    await adminCollection.insertOne({
      username: validation.data.username,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return { success: true, message: 'Admin user created successfully! You can now log in at /rajababuadmin.' };
  } catch (error) {
    console.error('Failed to set up admin:', error);
    return { success: false, message: 'An error occurred on the server.' };
  }
}
