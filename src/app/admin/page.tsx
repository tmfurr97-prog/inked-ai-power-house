'use client';

import { useRouter } from 'next/navigation';
import { ShieldCheck, UserRound, KeyRound } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getAdminEmails } from '@/lib/admin';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export default function AdminPage() {
  const router = useRouter();
  const adminEmails = getAdminEmails();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-headline text-4xl font-bold tracking-tight">Admin</h1>
        <p className="mt-2 text-muted-foreground">
          This area is restricted to accounts whose email is on the admin allowlist.
        </p>
      </div>

      <Alert>
        <ShieldCheck className="h-4 w-4" />
        <AlertTitle>Access Control</AlertTitle>
        <AlertDescription>
          Authentication system pending configuration.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserRound className="h-5 w-5" />
              Current Profile
            </CardTitle>
            <CardDescription>No active session detected.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            Connect an authentication provider to view profile details.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <KeyRound className="h-5 w-5" />
              Allowed Admin Emails
            </CardTitle>
            <CardDescription>
              Emails authorized via environment variables.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {adminEmails.map((email) => (
              <div key={email} className="rounded-md border px-3 py-2">
                {email}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Navigation</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={() => router.push('/dashboard')}>Back to Dashboard</Button>
        </CardContent>
      </Card>
    </div>
  );
}