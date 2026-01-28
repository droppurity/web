'use server';

import { z } from 'zod';
import { connectToDatabase } from '@/lib/mongodb';

const ContactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }).optional().or(z.literal('')),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export async function saveContact(data: z.infer<typeof ContactSchema>) {
  try {
    const validation = ContactSchema.safeParse(data);
    if (!validation.success) {
      const firstError = Object.values(validation.error.flatten().fieldErrors).flat()[0] || 'Invalid data provided.';
      return { success: false, message: firstError };
    }

    const client = await connectToDatabase();
    const db = client.db('droppurity-db');

    await db.collection('contacts').insertOne({
      ...validation.data,
      createdAt: new Date(),
    });

    return { success: true, message: 'Message sent successfully!' };
  } catch (error) {
    console.error('Failed to save contact message:', error);
    return { success: false, message: 'An error occurred on the server.' };
  }
}
