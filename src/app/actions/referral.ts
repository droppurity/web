'use server';

import { z } from 'zod';
import { connectToDatabase } from '@/lib/mongodb';

const ReferralSchema = z.object({
  customerId: z.string().min(1, { message: "Please enter your Customer ID." }),
  friendName: z.string().min(2, { message: "Friend's name must be at least 2 characters." }),
  friendAddress: z.string().min(10, { message: "Please provide a valid address." }),
  friendMobile: z.string().regex(/^[6-9]\d{9}$/, { message: "Please enter a valid 10-digit mobile number." }),
});

export async function saveReferral(data: z.infer<typeof ReferralSchema>) {
  try {
    const validation = ReferralSchema.safeParse(data);
    if (!validation.success) {
      const firstError = Object.values(validation.error.flatten().fieldErrors).flat()[0] || 'Invalid data provided.';
      return { success: false, message: firstError };
    }

    const client = await connectToDatabase();
    const db = client.db('droppurity-db');

    await db.collection('referrals').insertOne({
      ...validation.data,
      createdAt: new Date(),
    });

    return { success: true, message: 'Referral submitted successfully!' };
  } catch (error) {
    console.error('Failed to save referral:', error);
    return { success: false, message: 'An error occurred on the server.' };
  }
}
