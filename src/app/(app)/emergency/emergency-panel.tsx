'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ShieldAlert, Siren, Share2, PhoneCall } from 'lucide-react';
import { handleEmergency } from './actions';
import type { AssessSilentAlarmOutput } from '@/ai/flows/emergency-silent-alarm';
import { useToast } from '@/hooks/use-toast';

export function EmergencyPanel() {
  const [isLoading, setIsLoading] = useState(false);
  const [isTriggered, setIsTriggered] = useState(false);
  const [assessment, setAssessment] = useState<AssessSilentAlarmOutput | null>(null);
  const { toast } = useToast();

  const onEmergencyPress = async () => {
    setIsLoading(true);
    setIsTriggered(false);
    setAssessment(null);

    toast({
      title: 'Emergency Signal Sent',
      description: 'Your location has been shared with emergency contacts and nearest police unit.',
    });

    const result = await handleEmergency();

    if (result.success && result.data) {
      setAssessment(result.data);
      setIsTriggered(true);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
      <div className="flex flex-col items-center justify-center space-y-6">
        <h1 className="text-3xl font-bold text-center font-headline">Emergency Assistance</h1>
        <p className="text-center text-muted-foreground">
          Press and hold the button below in case of an emergency. This will immediately share your live location with your emergency contacts and the nearest police unit.
        </p>
        <Button
          className="w-48 h-48 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground text-2xl font-bold shadow-2xl transition-transform duration-200 active:scale-95 animate-pulse-slow"
          onClick={onEmergencyPress}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-16 h-16 animate-spin" />
          ) : (
            <div className="flex flex-col items-center">
              <Siren className="w-16 h-16" />
              <span>HELP</span>
            </div>
          )}
        </Button>
        <p className="text-sm text-muted-foreground">Press in a critical situation</p>
      </div>

      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Emergency Protocol</CardTitle>
          <CardDescription>Actions initiated upon button press.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-lg bg-muted">
            <Share2 className="w-6 h-6 text-primary" />
            <div>
              <p className="font-medium">Live Location Sharing</p>
              <p className="text-sm text-muted-foreground">Sent to emergency contacts & police.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-lg bg-muted">
            <PhoneCall className="w-6 h-6 text-primary" />
            <div>
              <p className="font-medium">Emergency Contacts Notified</p>
              <p className="text-sm text-muted-foreground">Your trusted members are alerted.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-lg bg-muted">
            <ShieldAlert className="w-6 h-6 text-primary" />
            <div>
              <p className="font-medium">AI Threat Assessment</p>
              <p className="text-sm text-muted-foreground">Situation analyzed for silent alarm.</p>
            </div>
          </div>

          {isTriggered && assessment && (
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-base">AI Assessment Result</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className={`flex items-center gap-2 font-bold ${assessment.silentAlarmRecommended ? 'text-destructive' : 'text-green-600'}`}>
                  <Siren className="w-5 h-5" />
                  <span>Silent Alarm Recommended: {assessment.silentAlarmRecommended ? 'YES' : 'NO'}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Reason:</strong> {assessment.reason}
                </p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
