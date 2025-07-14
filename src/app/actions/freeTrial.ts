
'use server';

import { z } from 'zod';
import { connectToDatabase } from '@/lib/mongodb';

// Same schema as the subscription form
const FreeTrialSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().regex(/^[6-9]\d{9}$/, { message: 'Please enter a valid 10-digit Indian mobile number.' }),
  location: z.string().url({ message: 'Please auto-fetch a valid location link.' }).optional().or(z.literal('')),
  address: z.string().min(10, { message: 'Please enter a full installation address.' }),
  purifierName: z.string(),
  planName: z.string(),
  tenure: z.string(),
});

export async function saveFreeTrial(data: z.infer<typeof FreeTrialSchema>) {
  try {
    const validation = FreeTrialSchema.safeParse(data);
    if (!validation.success) {
      console.error('Validation failed:', validation.error.flatten().fieldErrors);
      const firstError = Object.values(validation.error.flatten().fieldErrors).flat()[0] || 'Invalid data provided.';
      return { success: false, message: firstError };
    }

    const client = await connectToDatabase();
    const db = client.db('droppurity-db');

    // Save to the new 'free_trials' collection
    await db.collection('free_trials').insertOne({
      ...validation.data,
      createdAt: new Date(),
    });

    return { success: true, message: 'Free trial booked successfully!' };
  } catch (error) {
    console.error('Failed to save free trial request:', error);
    return { success: false, message: 'An error occurred on the server.' };
  }
}
