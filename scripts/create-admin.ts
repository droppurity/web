
import { MongoClient } from 'mongodb';
import { hash } from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable inside .env or .env.local');
  process.exit(1);
}

async function createAdmin() {
  const client = new MongoClient(MONGODB_URI!);

  try {
    await client.connect();
    const db = client.db('droppurity-db');
    const adminsCollection = db.collection('admins');

    const username = 'rajababuadmin';
    const password = 'admin123'; // Default password
    const hashedPassword = await hash(password, 12);

    const existingAdmin = await adminsCollection.findOne({ username });

    if (existingAdmin) {
      console.log(`Admin user '${username}' already exists.`);
      // Optionally update password if needed
      // await adminsCollection.updateOne({ username }, { $set: { password: hashedPassword } });
      // console.log(`Password for '${username}' updated.`);
    } else {
      await adminsCollection.insertOne({
        username,
        password: hashedPassword,
        createdAt: new Date(),
      });
      console.log(`Admin user '${username}' created successfully.`);
    }

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await client.close();
  }
}

createAdmin();
