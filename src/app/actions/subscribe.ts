
'use server';

import { z } from 'zod';
import { connectToDatabase } from '@/lib/mongodb';

const SubscriptionSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  location: z.string().url({ message: 'Please auto-fetch a valid location link.' }).optional().or(z.literal('')),
  address: z.string().min(10, { message: 'Please enter a full installation address.' }),
  purifierName: z.string(),
  planName: z.string(),
  tenure: z.string(),
});

export async function saveSubscription(data: z.infer<typeof SubscriptionSchema>) {
  try {
    const validation = SubscriptionSchema.safeParse(data);
    if (!validation.success) {
      console.error('Validation failed:', validation.error.flatten().fieldErrors);
      const firstError = Object.values(validation.error.flatten().fieldErrors).flat()[0] || 'Invalid data provided.';
      return { success: false, message: firstError };
    }

    const client = await connectToDatabase();
    const db = client.db('droppurity-db'); // Use default DB from connection string

    await db.collection('subscriptions').insertOne({
      ...validation.data,
      createdAt: new Date(),
    });

    return { success: true, message: 'Subscription saved successfully!' };
  } catch (error) {
    console.error('Failed to save subscription:', error);
    return { success: false, message: 'An error occurred on the server.' };
  }
}
