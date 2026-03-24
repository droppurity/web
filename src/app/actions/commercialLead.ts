'use server';

import { z } from 'zod';
import { connectToDatabase } from '@/lib/mongodb';

const CommercialLeadSchema = z.object({
  name: z.string().min(2),
  companyName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().regex(/^[6-9]\d{9}$/),
  requirement: z.string().min(10),
});

export async function saveCommercialLead(data: z.infer<typeof CommercialLeadSchema>) {
  try {
    const validation = CommercialLeadSchema.safeParse(data);
    if (!validation.success) {
      const firstError = Object.values(validation.error.flatten().fieldErrors).flat()[0] || 'Invalid data provided.';
      return { success: false, message: firstError };
    }

    const client = await connectToDatabase();
    const db = client.db('droppurity-db');

    await db.collection('commercial_leads').insertOne({
      ...validation.data,
      status: 'new',
      createdAt: new Date(),
    });

    return { success: true, message: 'Commercial lead saved successfully!' };
  } catch (error) {
    console.error('Failed to save commercial lead:', error);
    return { success: false, message: 'An error occurred on the server.' };
  }
}
