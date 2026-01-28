

'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Download } from 'lucide-react';

const NoLeads = () => (
    <div className="text-center py-10 text-muted-foreground">
        <p>No leads found in this category yet.</p>
    </div>
);

type SortOption = 'date-desc' | 'date-asc' | 'name-asc' | 'name-desc';

interface EnhancedTableProps {
    leads: any[];
    isClient: boolean;
    type: 'subscriptions' | 'trials' | 'contacts' | 'referrals';
}

const LeadCard = ({ lead, type, isClient }: { lead: any, type: EnhancedTableProps['type'], isClient: boolean }) => {
    return (
        <Card className="mb-4">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-base">{lead.name || lead.friendName}</CardTitle>
                        <CardDescription>{isClient ? format(new Date(lead.createdAt), 'PP p') : ''}</CardDescription>
                    </div>
                    {type === 'subscriptions' && <Badge variant="secondary">{lead.planName}</Badge>}
                </div>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
                {type === 'referrals' ? (
                    <>
                        <p><strong>Referrer ID:</strong> {lead.customerId}</p>
                        <p><strong>Friend:</strong> {lead.friendName} ({lead.friendMobile})</p>
                        <p><strong>Address:</strong> {lead.friendAddress}</p>
                    </>
                ) : (
                    <>
                        {lead.phone && <p><strong>Phone:</strong> <a href={`tel:${lead.phone}`} className="text-primary hover:underline">{lead.phone}</a></p>}
                        {lead.email && <p><strong>Email:</strong> <a href={`mailto:${lead.email}`} className="text-primary hover:underline">{lead.email}</a></p>}

                        {type === 'contacts' && (
                            <>
                                <p><strong>Subject:</strong> {lead.subject}</p>
                                <p><strong>Message:</strong> {lead.message}</p>
                            </>
                        )}

                        {type === 'subscriptions' && (
                            <>
                                <p><strong>Purifier:</strong> {lead.purifierName}</p>
                                <p><strong>Tenure:</strong> {lead.tenure}</p>
                            </>
                        )}

                        {(type === 'subscriptions' || type === 'trials') && (
                            <p><strong>Address:</strong> {lead.address || (lead.pincode ? `PIN: ${lead.pincode}` : 'N/A')}</p>
                        )}
                        {type === 'trials' && lead.city && <p><strong>City:</strong> {lead.city}</p>}
                    </>
                )}
            </CardContent>
        </Card>
    );
}

const LeadsTable = ({ leads, isClient, type }: EnhancedTableProps) => {
    if (leads.length === 0) return <NoLeads />;

    return (
        <>
            {/* Mobile View */}
            <div className="md:hidden">
                {leads.map(lead => (
                    <LeadCard key={lead._id} lead={lead} type={type} isClient={isClient} />
                ))}
            </div>

            {/* Desktop View */}
            <div className="hidden md:block max-h-[60vh] overflow-y-auto border rounded-lg">
                <Table>
                    <TableHeader className="sticky top-0 bg-muted/50">
                        <TableRow>
                            <TableHead>Date</TableHead>
                            {type === 'referrals' ? (
                                <>
                                    <TableHead>Referrer ID</TableHead>
                                    <TableHead>Friend's Name</TableHead>
                                    <TableHead>Friend's Mobile</TableHead>
                                    <TableHead>Friend's Address</TableHead>
                                </>
                            ) : (
                                <>
                                    <TableHead>Name</TableHead>
                                    {type !== 'contacts' && <TableHead>Phone</TableHead>}
                                    {type === 'contacts' && <TableHead>Email</TableHead>}
                                    {type === 'contacts' && <TableHead>Subject</TableHead>}
                                    {type === 'subscriptions' && <TableHead>Email</TableHead>}
                                    {type === 'subscriptions' && <TableHead>Purifier</TableHead>}
                                    {type === 'subscriptions' && <TableHead>Plan</TableHead>}
                                    {type === 'subscriptions' && <TableHead>Tenure</TableHead>}
                                    {(type === 'subscriptions' || type === 'trials') && <TableHead>Address</TableHead>}
                                    {type === 'trials' && <TableHead>City</TableHead>}
                                    {type === 'contacts' && <TableHead>Message</TableHead>}
                                </>
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {leads.map(lead => (
                            <TableRow key={lead._id}>
                                <TableCell>{isClient ? format(new Date(lead.createdAt), 'PP p') : ''}</TableCell>
                                {type === 'referrals' ? (
                                    <>
                                        <TableCell>{lead.customerId}</TableCell>
                                        <TableCell>{lead.friendName}</TableCell>
                                        <TableCell>
                                            <a href={`tel:${lead.friendMobile}`} className="text-primary hover:underline">{lead.friendMobile}</a>
                                        </TableCell>
                                        <TableCell className="text-xs">{lead.friendAddress}</TableCell>
                                    </>
                                ) : (
                                    <>
                                        <TableCell>{lead.name}</TableCell>
                                        {type !== 'contacts' && <TableCell><a href={`tel:${lead.phone}`} className="text-primary hover:underline">{lead.phone}</a></TableCell>}
                                        {type === 'contacts' && <TableCell><a href={`mailto:${lead.email}`} className="text-primary hover:underline">{lead.email}</a></TableCell>}
                                        {type === 'contacts' && <TableCell>{lead.subject}</TableCell>}
                                        {type === 'subscriptions' && <TableCell><a href={`mailto:${lead.email}`} className="text-primary hover:underline">{lead.email}</a></TableCell>}
                                        {type === 'subscriptions' && <TableCell>{lead.purifierName}</TableCell>}
                                        {type === 'subscriptions' && <TableCell><Badge variant="secondary">{lead.planName}</Badge></TableCell>}
                                        {type === 'subscriptions' && <TableCell><Badge variant="outline">{lead.tenure}</Badge></TableCell>}
                                        {(type === 'subscriptions' || type === 'trials') && <TableCell className="text-xs">{lead.address || (lead.pincode ? `PIN: ${lead.pincode}` : '')}</TableCell>}
                                        {type === 'trials' && <TableCell>{lead.city || 'N/A'}</TableCell>}
                                        {type === 'contacts' && <TableCell className="text-xs">{lead.message}</TableCell>}
                                    </>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div >
        </>
    );
};

const LeadsTabContent = ({ data, type }: { data: any[], type: EnhancedTableProps['type'] }) => {
    const [isClient, setIsClient] = useState(false);
    const [sort, setSort] = useState<SortOption>('date-desc');

    useEffect(() => setIsClient(true), []);

    // Grouping Logic
    const groupedData = useMemo(() => {
        const groups: Record<string, any[]> = {};

        data.forEach(item => {
            // Determine grouping key
            let city = item.city;

            // Infer city from address if missing
            if (!city && item.address) {
                const lowerAddress = item.address.toLowerCase();
                if (lowerAddress.includes('bokaro')) city = 'Bokaro';
                else if (lowerAddress.includes('chas')) city = 'Bokaro';
                else if (lowerAddress.includes('dhanbad')) city = 'Dhanbad';
                else if (lowerAddress.includes('ranchi')) city = 'Ranchi';
                else if (lowerAddress.includes('patna')) city = 'Patna';
                else if (lowerAddress.includes('delhi')) city = 'Delhi';
                else if (lowerAddress.includes('noida')) city = 'Noida';
                else if (lowerAddress.includes('gurgaon') || lowerAddress.includes('gurugram')) city = 'Gurgaon';
                else if (lowerAddress.includes('kolkata')) city = 'Kolkata';
                else if (lowerAddress.includes('bangalore') || lowerAddress.includes('bengaluru')) city = 'Bangalore';
                else if (lowerAddress.includes('mumbai')) city = 'Mumbai';
                else if (lowerAddress.includes('pune')) city = 'Pune';
            }

            if (!city) city = 'Unspecified / General';

            if (type === 'referrals') city = 'Referrals (All)';
            if (type === 'contacts') city = 'Contacts (All)';

            // Normalize
            city = city.trim();
            if (!city) city = 'Unspecified';

            if (!groups[city]) groups[city] = [];
            groups[city].push(item);
        });

        // Sort groups alphabetically? Or just keep them as is
        return groups;
    }, [data, type]);

    // Sorting Logic within Groups
    const sortedGroupKeys = useMemo(() => Object.keys(groupedData).sort(), [groupedData]);

    const getSortedLeads = (leads: any[]) => {
        return [...leads].sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();

            switch (sort) {
                case 'date-desc': return dateB - dateA;
                case 'date-asc': return dateA - dateB;
                case 'name-asc': return (a.name || a.friendName || '').localeCompare(b.name || b.friendName || '');
                case 'name-desc': return (b.name || b.friendName || '').localeCompare(a.name || a.friendName || '');
                default: return 0;
            }
        });
    };

    // CSV Download
    const downloadCSV = () => {
        const headers = ['Date', 'Name', 'Phone', 'Email', 'City', 'Pincode', 'Details'];
        const rows = data.map(item => [
            format(new Date(item.createdAt), 'yyyy-MM-dd HH:mm:ss'),
            item.name || item.friendName || '',
            item.phone || item.friendMobile || '',
            item.email || '',
            item.city || '',
            item.pincode || '',
            type === 'subscriptions' ? `${item.purifierName} - ${item.planName}` : (item.message || item.friendAddress || '')
        ].map((cell, index) => {
            const str = String(cell).replace(/"/g, '""');
            // Force phone (index 2) and pincode (index 5) to be text in Excel using ="val" syntax
            if ((index === 2 || index === 5) && str) return `="\t${str}"`;
            return `"${str}"`;
        }).join(','));

        const csvContent = [headers.join(','), ...rows].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `${type}_leads_${format(new Date(), 'yyyy-MM-dd')}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (data.length === 0) return <NoLeads />;

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-center mb-4">
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSort(s => s === 'date-desc' ? 'date-asc' : 'date-desc')}
                    >
                        <ArrowUpDown className="mr-2 h-4 w-4" />
                        Sort by Date {sort === 'date-desc' ? '↓' : (sort === 'date-asc' ? '↑' : '')}
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSort(s => s === 'name-asc' ? 'name-desc' : 'name-asc')}
                    >
                        Sort by Name {sort.startsWith('name') ? (sort === 'name-asc' ? 'A-Z' : 'Z-A') : ''}
                    </Button>
                </div>
                <Button variant="default" size="sm" onClick={downloadCSV}>
                    <Download className="mr-2 h-4 w-4" /> Download CSV
                </Button>
            </div>

            <Accordion type="multiple" defaultValue={sortedGroupKeys} className="space-y-2">
                {sortedGroupKeys.map(city => (
                    <AccordionItem key={city} value={city} className="border rounded-lg bg-card px-2">
                        <AccordionTrigger className="hover:no-underline px-2">
                            <span className="font-semibold text-lg">{city}</span>
                            <Badge variant="secondary" className="ml-2">{groupedData[city].length}</Badge>
                        </AccordionTrigger>
                        <AccordionContent className="pt-2">
                            <LeadsTable leads={getSortedLeads(groupedData[city])} isClient={isClient} type={type} />
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}

export default function LeadsManager({ contacts, trials, subscriptions, referrals }: { contacts: any[], trials: any[], subscriptions: any[], referrals: any[] }) {
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
                    <TabsContent value="subscriptions"><LeadsTabContent data={subscriptions} type="subscriptions" /></TabsContent>
                    <TabsContent value="trials"><LeadsTabContent data={trials} type="trials" /></TabsContent>
                    <TabsContent value="contacts"><LeadsTabContent data={contacts} type="contacts" /></TabsContent>
                    <TabsContent value="referrals"><LeadsTabContent data={referrals} type="referrals" /></TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}
