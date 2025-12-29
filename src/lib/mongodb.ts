import { MongoClient } from 'mongodb';

// Add your MongoDB connection string to a .env.local file
const MONGODB_URI = process.env.MONGODB_URI;

let cachedClient: MongoClient | null = null;

export async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  if (!MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    );
  }

  const client = await MongoClient.connect(MONGODB_URI);

  cachedClient = client;
  return client;
}
