
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Droplet, Watch, Thermometer, Zap } from 'lucide-react';
import ProtectedRoute from '@/components/layout/ProtectedRoute';

const usageData = [
  { day: 'Mon', litres: 22 },
  { day: 'Tue', litres: 18 },
  { day: 'Wed', litres: 25 },
  { day: 'Thu', litres: 28 },
  { day: 'Fri', litres: 23 },
  { day: 'Sat', litres: 30 },
  { day: 'Sun', litres: 26 },
];

function DashboardPage() {
  return (
    <ProtectedRoute>
        <div className="py-8 sm:py-12 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-10 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl font-bold font-headline text-primary">
                Your Dashboard
              </h1>
              <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Real-time insights into your water consumption and purifier health.
              </p>
            </header>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
              <Card className="shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Water Used Today</CardTitle>
                  <Droplet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12.5 Litres</div>
                  <p className="text-xs text-muted-foreground">out of 25 Litres daily limit</p>
                </CardContent>
              </Card>
              <Card className="shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Daily Use</CardTitle>
                  <Droplet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15.2 Litres</div>
                  <p className="text-xs text-muted-foreground">+2.1L from last week</p>
                </CardContent>
              </Card>
              <Card className="shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Last TDS Reported</CardTitle>
                  <Thermometer className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">85 ppm</div>
                  <p className="text-xs text-muted-foreground">Checked 2 hours ago</p>
                </CardContent>
              </Card>
               <Card className="shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Daily Running Time</CardTitle>
                  <Watch className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1h 15m</div>
                  <p className="text-xs text-muted-foreground">Total runtime today</p>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle>Weekly Water Usage</CardTitle>
                <CardDescription>
                  Here's a look at your water consumption over the last 7 days.
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={usageData}>
                    <XAxis
                      dataKey="day"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}L`}
                    />
                    <Tooltip
                        cursor={{fill: 'hsl(var(--muted))'}}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="rounded-lg border bg-background p-2 shadow-sm">
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="flex flex-col">
                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                      Day
                                    </span>
                                    <span className="font-bold text-muted-foreground">
                                      {payload[0].payload.day}
                                    </span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                      Litres
                                    </span>
                                    <span className="font-bold">
                                      {payload[0].value}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )
                          }

                          return null
                        }}
                    />
                    <Bar dataKey="litres" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
    </ProtectedRoute>
  );
}

export default DashboardPage;
