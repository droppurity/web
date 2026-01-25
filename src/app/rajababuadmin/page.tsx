
import { connectToDatabase } from '@/lib/mongodb';
import ImageManager from '@/components/droppurity/ImageManager';
import LeadsManager from '@/components/droppurity/LeadsManager';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Helper function to safely serialize MongoDB documents for Client Components
const serializeDocs = (docs: any[]) => {
  return docs.map(doc => {
    const plainDoc = { ...doc };
    if (plainDoc._id) {
      plainDoc._id = plainDoc._id.toString();
    }
    if (plainDoc.createdAt && plainDoc.createdAt instanceof Date) {
      plainDoc.createdAt = plainDoc.createdAt.toISOString();
    }
    // You can add more checks for other non-serializable types if needed
    return plainDoc;
  });
};


async function getLeads() {
  try {
    const client = await connectToDatabase();
    const db = client.db('droppurity-db');

    const contacts = await db.collection('contacts').find({}).sort({ createdAt: -1 }).toArray();
    const free_trials = await db.collection('free_trials').find({}).sort({ createdAt: -1 }).toArray();
    const subscriptions = await db.collection('subscriptions').find({}).sort({ createdAt: -1 }).toArray();
    const referrals = await db.collection('referrals').find({}).sort({ createdAt: -1 }).toArray();

    return {
      contacts: serializeDocs(contacts),
      trials: serializeDocs(free_trials),
      subscriptions: serializeDocs(subscriptions),
      referrals: serializeDocs(referrals),
    };
  } catch (error) {
    console.error("Failed to fetch leads:", error);
    return { contacts: [], trials: [], subscriptions: [], referrals: [] };
  }
}

export default async function AdminDashboardPage() {
    // Auth is now handled by middleware, so we can directly render the page content.
    const { contacts, trials, subscriptions, referrals } = await getLeads();

    return (
        <div className="py-8 sm:py-12 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-10 sm:mb-14">
                    <h1 className="text-3xl sm:text-4xl font-bold font-headline text-primary">
                        Admin Dashboard
                    </h1>
                    <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                       Welcome, Admin. Manage your leads and site content here.
                    </p>
                </header>

                 <Tabs defaultValue="leads" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="leads">Manage Leads</TabsTrigger>
                        <TabsTrigger value="images">Manage Site Images</TabsTrigger>
                    </TabsList>
                    <TabsContent value="leads">
                        <LeadsManager contacts={contacts} trials={trials} subscriptions={subscriptions} referrals={referrals} />
                    </TabsContent>
                    <TabsContent value="images">
                        <Card className="shadow-xl">
                            <CardHeader>
                                <CardTitle>ImageKit Uploader</CardTitle>
                                <CardDescription>Upload and manage images for your city pages.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ImageManager />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
