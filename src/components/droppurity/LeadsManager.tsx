

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

const NoLeads = () => (
    <div className="text-center py-10 text-muted-foreground">
        <p>No leads found in this category yet.</p>
    </div>
);

const SubscriptionsTable = ({ leads, isClient }: { leads: any[], isClient: boolean }) => {
    if (leads.length === 0) return <NoLeads />;
    return (
        <div className="max-h-[60vh] overflow-y-auto border rounded-lg">
            <Table>
                <TableHeader className="sticky top-0 bg-muted/50">
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Purifier</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Tenure</TableHead>
                        <TableHead>Address</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {leads.map(lead => (
                        <TableRow key={lead._id}>
                            <TableCell>{isClient ? format(new Date(lead.createdAt), 'PP') : ''}</TableCell>
                            <TableCell>{lead.name}</TableCell>
                            <TableCell>{lead.phone}</TableCell>
                            <TableCell>{lead.email}</TableCell>
                            <TableCell>{lead.purifierName}</TableCell>
                            <TableCell><Badge variant="secondary">{lead.planName}</Badge></TableCell>
                            <TableCell><Badge variant="outline">{lead.tenure}</Badge></TableCell>
                            <TableCell className="text-xs">{lead.address}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

const TrialsTable = ({ leads, isClient }: { leads: any[], isClient: boolean }) => {
     if (leads.length === 0) return <NoLeads />;
    return (
        <div className="max-h-[60vh] overflow-y-auto border rounded-lg">
            <Table>
                <TableHeader className="sticky top-0 bg-muted/50">
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>Address</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {leads.map(lead => (
                        <TableRow key={lead._id}>
                            <TableCell>{isClient ? format(new Date(lead.createdAt), 'PP') : ''}</TableCell>
                            <TableCell>{lead.name}</TableCell>
                            <TableCell>{lead.phone}</TableCell>
                            <TableCell>{lead.city || 'N/A'}</TableCell>
                            <TableCell className="text-xs">{lead.address}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

const ContactsTable = ({ leads, isClient }: { leads: any[], isClient: boolean }) => {
    if (leads.length === 0) return <NoLeads />;
    return (
        <div className="max-h-[60vh] overflow-y-auto border rounded-lg">
            <Table>
                <TableHeader className="sticky top-0 bg-muted/50">
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Message</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {leads.map(lead => (
                        <TableRow key={lead._id}>
                            <TableCell>{isClient ? format(new Date(lead.createdAt), 'PP p') : ''}</TableCell>
                            <TableCell>{lead.name}</TableCell>
                            <TableCell>{lead.email}</TableCell>
                            <TableCell>{lead.subject}</TableCell>
                            <TableCell className="text-xs">{lead.message}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

const ReferralsTable = ({ leads, isClient }: { leads: any[], isClient: boolean }) => {
    if (leads.length === 0) return <NoLeads />;
    return (
        <div className="max-h-[60vh] overflow-y-auto border rounded-lg">
            <Table>
                <TableHeader className="sticky top-0 bg-muted/50">
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Referrer ID</TableHead>
                        <TableHead>Friend's Name</TableHead>
                        <TableHead>Friend's Mobile</TableHead>
                        <TableHead>Friend's Address</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {leads.map(lead => (
                        <TableRow key={lead._id}>
                            <TableCell>{isClient ? format(new Date(lead.createdAt), 'PP') : ''}</TableCell>
                            <TableCell>{lead.customerId}</TableCell>
                            <TableCell>{lead.friendName}</TableCell>
                            <TableCell>{lead.friendMobile}</TableCell>
                            <TableCell className="text-xs">{lead.friendAddress}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};


export default function LeadsManager({ contacts, trials, subscriptions, referrals }: { contacts: any[], trials: any[], subscriptions: any[], referrals: any[]}) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <Card className="shadow-xl">
            <CardHeader>
                <CardTitle>Leads Overview</CardTitle>
                <CardDescription>View all incoming requests and contacts from your users.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="subscriptions" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
                        <TabsTrigger value="subscriptions">Subscriptions <Badge className="ml-2">{subscriptions.length}</Badge></TabsTrigger>
                        <TabsTrigger value="trials">Free Trials <Badge className="ml-2">{trials.length}</Badge></TabsTrigger>
                        <TabsTrigger value="contacts">Contacts <Badge className="ml-2">{contacts.length}</Badge></TabsTrigger>
                        <TabsTrigger value="referrals">Referrals <Badge className="ml-2">{referrals.length}</Badge></TabsTrigger>
                    </TabsList>
                    <TabsContent value="subscriptions"><SubscriptionsTable leads={subscriptions} isClient={isClient} /></TabsContent>
                    <TabsContent value="trials"><TrialsTable leads={trials} isClient={isClient} /></TabsContent>
                    <TabsContent value="contacts"><ContactsTable leads={contacts} isClient={isClient} /></TabsContent>
                    <TabsContent value="referrals"><ReferralsTable leads={referrals} isClient={isClient} /></TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}
