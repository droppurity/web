'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

const NoLeads = () => (
    <div className="text-center py-10 text-muted-foreground w-full">
        <p>No leads found matching your criteria.</p>
    </div>
);

// Generic processing logic for searching, sorting, and grouping
function useProcessedLeads(leads: any[], search: string, sort: string, group: string) {
    return useMemo(() => {
        let result = [...leads];

        // Search
        if (search) {
            const lowerTerm = search.toLowerCase();
            result = result.filter(lead =>
                Object.values(lead).some(val =>
                    String(val).toLowerCase().includes(lowerTerm)
                )
            );
        }

        // Sort (format: "field-direction")
        if (sort) {
            const [field, direction] = sort.split('-');
            result.sort((a, b) => {
                const valA = String(a[field] || '').toLowerCase();
                const valB = String(b[field] || '').toLowerCase();
                
                // Keep original Date objects out of string comparison if possible, but fallback is string comparison.
                if (field === 'createdAt') {
                    const timeA = new Date(a.createdAt).getTime();
                    const timeB = new Date(b.createdAt).getTime();
                    return direction === 'asc' ? timeA - timeB : timeB - timeA;
                }

                if (valA < valB) return direction === 'asc' ? -1 : 1;
                if (valA > valB) return direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        // Group
        if (group && group !== 'none') {
            const grouped = result.reduce((acc, lead) => {
                const key = lead[group] || 'Unspecified';
                if (!acc[key]) acc[key] = [];
                acc[key].push(lead);
                return acc;
            }, {} as Record<string, any[]>);
            return { isGrouped: true, data: grouped as Record<string, any[]> };
        }

        return { isGrouped: false, data: result as any[] };
    }, [leads, search, sort, group]);
}

// Reusable Toolbar Component
const DataToolbar = ({
    search, setSearch,
    sort, setSort, sortOptions,
    group, setGroup, groupOptions
}: any) => (
    <div className="flex flex-col md:flex-row gap-3 mb-4 mt-2">
        <div className="relative flex-1 md:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder="Search anything..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-10 bg-slate-50/50"
            />
        </div>
        <div className="flex gap-3">
            <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-[160px] h-10 bg-slate-50/50"><SelectValue placeholder="Sort By" /></SelectTrigger>
                <SelectContent>
                    {sortOptions.map((opt: any) => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                </SelectContent>
            </Select>
            <Select value={group} onValueChange={setGroup}>
                <SelectTrigger className="w-[160px] h-10 bg-slate-50/50"><SelectValue placeholder="Group By" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="none">No Grouping</SelectItem>
                    {groupOptions.map((opt: any) => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                </SelectContent>
            </Select>
        </div>
    </div>
);

// Wrapper to render grouped vs ungrouped tables easily
const TableLayoutWrapper = ({ processed, renderTable }: { processed: any, renderTable: (items: any[]) => React.ReactNode }) => {
    if (processed.isGrouped) {
        const entries = Object.entries(processed.data as Record<string, any[]>);
        if (entries.length === 0) return <NoLeads />;
        return (
            <div className="space-y-6">
                {entries.map(([groupName, groupItems]) => (
                    <div key={groupName} className="border rounded-lg shadow-sm overflow-hidden bg-white">
                        <div className="bg-slate-50 px-4 py-3 border-b flex items-center justify-between">
                            <h3 className="font-semibold text-slate-800 capitalize">{groupName}</h3>
                            <Badge variant="secondary">{groupItems.length} items</Badge>
                        </div>
                        <div className="max-h-[50vh] overflow-y-auto">
                            {renderTable(groupItems)}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
    
    if ((processed.data as any[]).length === 0) return <NoLeads />;
    return (
        <div className="max-h-[60vh] overflow-y-auto border rounded-lg shadow-sm">
            {renderTable(processed.data as any[])}
        </div>
    );
};

// -- Table Variants --

const SubscriptionsTab = ({ leads, isClient }: { leads: any[], isClient: boolean }) => {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('createdAt-desc');
    const [group, setGroup] = useState('none');
    
    const processed = useProcessedLeads(leads, search, sort, group);

    const renderTable = (items: any[]) => (
        <Table>
            <TableHeader className="sticky top-0 bg-white shadow-sm z-10">
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
                {items.map(lead => (
                    <TableRow key={lead._id}>
                        <TableCell className="whitespace-nowrap">{isClient ? format(new Date(lead.createdAt), 'PP') : ''}</TableCell>
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell><a href={`tel:${lead.phone}`} className="text-primary hover:underline">{lead.phone}</a></TableCell>
                        <TableCell><a href={`mailto:${lead.email}`} className="text-primary hover:underline max-w-[150px] truncate block" title={lead.email}>{lead.email}</a></TableCell>
                        <TableCell>{lead.purifierName}</TableCell>
                        <TableCell><Badge variant="secondary">{lead.planName}</Badge></TableCell>
                        <TableCell><Badge variant="outline">{lead.tenure}</Badge></TableCell>
                        <TableCell className="text-xs max-w-[200px] truncate" title={lead.address}>{lead.address}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );

    return (
        <div>
            <DataToolbar 
                search={search} setSearch={setSearch} 
                sort={sort} setSort={setSort} group={group} setGroup={setGroup}
                sortOptions={[
                    { label: 'Date (Newest)', value: 'createdAt-desc' },
                    { label: 'Date (Oldest)', value: 'createdAt-asc' },
                    { label: 'Name (A-Z)', value: 'name-asc' },
                    { label: 'Plan', value: 'planName-asc' },
                    { label: 'City (A-Z)', value: 'city-asc' },
                    { label: 'Pin Code', value: 'pinCode-asc' }
                ]}
                groupOptions={[
                    { label: 'Plan', value: 'planName' },
                    { label: 'Purifier', value: 'purifierName' },
                    { label: 'Tenure', value: 'tenure' },
                    { label: 'City', value: 'city' },
                    { label: 'Pin Code', value: 'pinCode' }
                ]}
            />
            <TableLayoutWrapper processed={processed} renderTable={renderTable} />
        </div>
    );
};

const TrialsTab = ({ leads, isClient }: { leads: any[], isClient: boolean }) => {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('createdAt-desc');
    const [group, setGroup] = useState('none');
    
    const processed = useProcessedLeads(leads, search, sort, group);

    const renderTable = (items: any[]) => (
        <Table>
            <TableHeader className="sticky top-0 bg-white shadow-sm z-10">
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Pincode</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.map(lead => (
                    <TableRow key={lead._id}>
                        <TableCell className="whitespace-nowrap">{isClient ? format(new Date(lead.createdAt), 'PP') : ''}</TableCell>
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell><a href={`tel:${lead.phone}`} className="text-primary hover:underline">{lead.phone}</a></TableCell>
                        <TableCell><Badge variant="secondary">{lead.city || 'N/A'}</Badge></TableCell>
                        <TableCell className="text-xs max-w-[250px] truncate" title={lead.address}>{lead.address}</TableCell>
                        <TableCell>{lead.pinCode || 'N/A'}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );

    return (
        <div>
            <DataToolbar 
                search={search} setSearch={setSearch} 
                sort={sort} setSort={setSort} group={group} setGroup={setGroup}
                sortOptions={[
                    { label: 'Date (Newest)', value: 'createdAt-desc' },
                    { label: 'Date (Oldest)', value: 'createdAt-asc' },
                    { label: 'Name (A-Z)', value: 'name-asc' },
                    { label: 'City (A-Z)', value: 'city-asc' },
                    { label: 'Pin Code', value: 'pinCode-asc' }
                ]}
                groupOptions={[
                    { label: 'City', value: 'city' },
                    { label: 'Pin Code', value: 'pinCode' }
                ]}
            />
            <TableLayoutWrapper processed={processed} renderTable={renderTable} />
        </div>
    );
};

const ContactsTab = ({ leads, isClient }: { leads: any[], isClient: boolean }) => {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('createdAt-desc');
    const [group, setGroup] = useState('none');
    
    const processed = useProcessedLeads(leads, search, sort, group);

    const renderTable = (items: any[]) => (
        <Table>
            <TableHeader className="sticky top-0 bg-white shadow-sm z-10">
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Message</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.map(lead => (
                    <TableRow key={lead._id}>
                        <TableCell className="whitespace-nowrap">{isClient ? format(new Date(lead.createdAt), 'PP p') : ''}</TableCell>
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell><a href={`mailto:${lead.email}`} className="text-primary hover:underline">{lead.email}</a></TableCell>
                        <TableCell className="font-medium">{lead.subject}</TableCell>
                        <TableCell className="text-sm max-w-[300px] truncate" title={lead.message}>{lead.message}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );

    return (
        <div>
            <DataToolbar 
                search={search} setSearch={setSearch} 
                sort={sort} setSort={setSort} group={group} setGroup={setGroup}
                sortOptions={[
                    { label: 'Date (Newest)', value: 'createdAt-desc' },
                    { label: 'Date (Oldest)', value: 'createdAt-asc' },
                    { label: 'Name (A-Z)', value: 'name-asc' }
                ]}
                groupOptions={[
                    { label: 'Subject', value: 'subject' }
                ]}
            />
            <TableLayoutWrapper processed={processed} renderTable={renderTable} />
        </div>
    );
};

const ReferralsTab = ({ leads, isClient }: { leads: any[], isClient: boolean }) => {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('createdAt-desc');
    const [group, setGroup] = useState('none');
    
    const processed = useProcessedLeads(leads, search, sort, group);

    const renderTable = (items: any[]) => (
        <Table>
            <TableHeader className="sticky top-0 bg-white shadow-sm z-10">
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Referrer ID</TableHead>
                    <TableHead>Friend's Name</TableHead>
                    <TableHead>Friend's Mobile</TableHead>
                    <TableHead>Friend's Address</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.map(lead => (
                    <TableRow key={lead._id}>
                        <TableCell className="whitespace-nowrap">{isClient ? format(new Date(lead.createdAt), 'PP') : ''}</TableCell>
                        <TableCell className="font-medium font-mono text-primary">{lead.customerId}</TableCell>
                        <TableCell>{lead.friendName}</TableCell>
                        <TableCell><a href={`tel:${lead.friendMobile}`} className="text-primary hover:underline">{lead.friendMobile}</a></TableCell>
                        <TableCell className="text-xs max-w-[250px] truncate" title={lead.friendAddress}>{lead.friendAddress}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );

    return (
        <div>
            <DataToolbar 
                search={search} setSearch={setSearch} 
                sort={sort} setSort={setSort} group={group} setGroup={setGroup}
                sortOptions={[
                    { label: 'Date (Newest)', value: 'createdAt-desc' },
                    { label: 'Date (Oldest)', value: 'createdAt-asc' },
                    { label: 'Referrer ID', value: 'customerId-asc' }
                ]}
                groupOptions={[
                    { label: 'Referrer ID', value: 'customerId' }
                ]}
            />
            <TableLayoutWrapper processed={processed} renderTable={renderTable} />
        </div>
    );
};


export default function LeadsManager({ contacts, trials, subscriptions, referrals }: { contacts: any[], trials: any[], subscriptions: any[], referrals: any[]}) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <Card className="shadow-xl border-slate-200">
            <CardHeader className="bg-slate-50 border-b pb-6">
                <CardTitle className="text-2xl text-slate-800">Leads Overview</CardTitle>
                <CardDescription>View, sort, filter, and group all incoming requests and contacts from your users.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                <Tabs defaultValue="subscriptions" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto mb-6 bg-slate-100 p-1">
                        <TabsTrigger value="subscriptions" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                            Subscriptions <Badge variant="secondary" className="ml-2">{subscriptions.length}</Badge>
                        </TabsTrigger>
                        <TabsTrigger value="trials" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                            Free Trials <Badge variant="secondary" className="ml-2">{trials.length}</Badge>
                        </TabsTrigger>
                        <TabsTrigger value="contacts" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                            Contacts <Badge variant="secondary" className="ml-2">{contacts.length}</Badge>
                        </TabsTrigger>
                        <TabsTrigger value="referrals" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                            Referrals <Badge variant="secondary" className="ml-2">{referrals.length}</Badge>
                        </TabsTrigger>
                    </TabsList>
                    
                    <div className="bg-white rounded-xl">
                        <TabsContent value="subscriptions"><SubscriptionsTab leads={subscriptions} isClient={isClient} /></TabsContent>
                        <TabsContent value="trials"><TrialsTab leads={trials} isClient={isClient} /></TabsContent>
                        <TabsContent value="contacts"><ContactsTab leads={contacts} isClient={isClient} /></TabsContent>
                        <TabsContent value="referrals"><ReferralsTab leads={referrals} isClient={isClient} /></TabsContent>
                    </div>
                </Tabs>
            </CardContent>
        </Card>
    )
}

