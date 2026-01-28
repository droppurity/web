'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { v4 as uuidv4 } from 'uuid';
import { Loader2, AlertCircle, Copy, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function AdminLoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [deviceId, setDeviceId] = useState('');
    const [verificationPending, setVerificationPending] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Generate or retrieve persistent Device ID
        let id = localStorage.getItem('admin_device_id');
        if (!id) {
            id = uuidv4();
            localStorage.setItem('admin_device_id', id);
        }
        setDeviceId(id);
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/admin-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, deviceId }),
            });

            const data = await res.json();

            if (res.ok) {
                router.push('/rajababuadmin');
                router.refresh();
            } else if (res.status === 403 && data.deviceUnverified) {
                setVerificationPending(true);
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCheckVerification = async () => {
        setIsLoading(true);
        try {
            // Attempt login again with existing credentials if saved, or just refresh
            // For simplicity, we can just trigger the same login flow if we have creds,
            // or ask user to click "Login" again. 
            // Better UX: Reuse current state to retry.

            const res = await fetch('/api/auth/admin-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, deviceId }),
            });

            if (res.ok) {
                router.push('/rajababuadmin');
                router.refresh();
            } else {
                setError('Device still not verified. Please ensure you saved the ID.');
            }
        } catch (err) {
            setError('Verification check failed.');
        } finally {
            setIsLoading(false);
        }
    }

    const copyDeviceId = () => {
        navigator.clipboard.writeText(deviceId);
    };

    if (verificationPending) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-amber-600 flex items-center gap-2">
                            <AlertCircle className="h-6 w-6" />
                            Device Verification Required
                        </CardTitle>
                        <CardDescription>
                            This device is not authorized to access the admin panel.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Alert>
                            <AlertTitle>Action Required</AlertTitle>
                            <AlertDescription>
                                Please ask an existing admin to add this Device ID to your user record in the database.
                            </AlertDescription>
                        </Alert>

                        <div className="space-y-2">
                            <Label>Your Device ID</Label>
                            <div className="flex gap-2">
                                <Input readOnly value={deviceId} className="font-mono bg-muted" />
                                <Button size="icon" variant="outline" onClick={copyDeviceId} title="Copy ID">
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2">
                        <Button className="w-full" onClick={handleCheckVerification} disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
                            I Have Added This ID, Check Again
                        </Button>
                        <Button variant="ghost" className="w-full" onClick={() => setVerificationPending(false)}>
                            Back to Login
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Admin Login</CardTitle>
                    <CardDescription>Enter your credentials to access the dashboard.</CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4">
                        {error && (
                            <Alert variant="destructive">
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                            Device ID: <span className="font-mono">{deviceId ? deviceId.slice(0, 8) + '...' : 'Generating...'}</span>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full" disabled={isLoading || !deviceId}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Login'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
