
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import { ObjectId } from 'mongodb';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable inside .env or .env.local');
    process.exit(1);
}

const deviceId = process.argv[2];
const username = process.argv[3] || 'rajababuadmin';

if (!deviceId) {
    console.error('Please provide a Device ID as an argument.');
    console.log('Usage: npx tsx scripts/add-device.ts <DEVICE_ID> [USERNAME]');
    process.exit(1);
}

async function addDevice() {
    const client = new MongoClient(MONGODB_URI!);

    try {
        await client.connect();
        const db = client.db('droppurity-db');
        const adminsCollection = db.collection('admins');

        const result = await adminsCollection.updateOne(
            { username },
            { $addToSet: { allowed_devices: deviceId } }
        );

        if (result.matchedCount === 0) {
            console.error(`User '${username}' not found.`);
        } else if (result.modifiedCount === 0) {
            console.log(`Device ID '${deviceId}' was already approved for '${username}'.`);
        } else {
            console.log(`Successfully added device '${deviceId}' to user '${username}'.`);
        }

    } catch (error) {
        console.error('Error adding device:', error);
    } finally {
        await client.close();
    }
}

addDevice();
