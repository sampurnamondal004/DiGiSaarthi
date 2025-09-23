'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DigitalIdCard } from '@/components/profile/digital-id-card';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  nationality: z.string().min(2, 'Nationality is required.'),
  passport: z.string().regex(/^[A-PR-WYa-pr-wy][1-9]\d\s?\d{4}[1-9]$/, 'Invalid passport number format.'),
});

type FormData = z.infer<typeof formSchema>;

export default function ProfilePage() {
  const [generatedId, setGeneratedId] = useState<FormData & { id: string } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      nationality: '',
      passport: '',
    },
  });

  function onSubmit(values: FormData) {
    setIsGenerating(true);
    // Simulate API call and ID generation
    setTimeout(() => {
      setGeneratedId({
        ...values,
        id: `DTS-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      });
      setIsGenerating(false);
    }, 1500);
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold font-headline">My Profile & Digital ID</h1>
        <p className="text-muted-foreground">
          Generate a unique, temporary, and secure digital ID for your trip.
        </p>
      </header>
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <Card className="flex-1 w-full">
          <CardHeader>
            <CardTitle>Generate Digital ID</CardTitle>
            <CardDescription>
              Enter your details to create your ID. This information is not stored permanently.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nationality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nationality</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Canadian" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="passport"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Passport Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your passport number" {...field} />
                      </FormControl>
                       <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isGenerating}>
                  {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {generatedId ? 'Regenerate ID' : 'Generate ID'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="flex-1 w-full flex justify-center items-center mt-8 md:mt-0">
          {generatedId ? (
            <DigitalIdCard
              id={generatedId.id}
              name={generatedId.name}
              nationality={generatedId.nationality}
              passport={generatedId.passport}
            />
          ) : (
            <Card className="max-w-md w-full border-dashed flex flex-col items-center justify-center p-12 text-center">
              <CardTitle className="mb-2">Your Digital ID will appear here</CardTitle>
              <CardDescription>Complete the form to generate your ID.</CardDescription>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
