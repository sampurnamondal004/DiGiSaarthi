'use client';

import { BellRing, MapPin, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { alerts } from '@/lib/data';
import type { Alert } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '../ui/badge';

const AlertIcon = ({ type }: { type: Alert['type'] }) => {
  switch (type) {
    case 'Panic Button':
      return <div className="p-2 bg-destructive/20 rounded-full"><BellRing className="w-4 h-4 text-destructive" /></div>;
    case 'Geofence':
      return <div className="p-2 bg-yellow-500/20 rounded-full"><AlertTriangle className="w-4 h-4 text-yellow-600" /></div>;
    case 'Location Drop-off':
      return <div className="p-2 bg-blue-500/20 rounded-full"><MapPin className="w-4 h-4 text-blue-600" /></div>;
    default:
      return <div className="p-2 bg-muted rounded-full"><BellRing className="w-4 h-4 text-muted-foreground" /></div>;
  }
};

export function AlertFeed() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Recent Alerts</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1">
        <ScrollArea className="h-full">
          <div className="space-y-4 p-6 pt-0">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-4">
                <AlertIcon type={alert.type} />
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                     <p className="font-medium">{alert.touristName}</p>
                     <Badge variant={alert.type === 'Panic Button' ? 'destructive' : 'secondary'}>{alert.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
