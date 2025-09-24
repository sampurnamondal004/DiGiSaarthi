import { AlertFeed } from '@/components/dashboard/alert-feed';
import { MainMap } from '@/components/dashboard/map';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-6 h-full">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Tourists
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              Currently monitored tourists
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              High-Risk Zones
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Geofenced areas
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overall Safety Score
            </CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">82 / 100</div>
            <p className="text-xs text-muted-foreground">
              Average TSS for active areas
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-6 lg:grid-cols-2 xl:grid-cols-3 flex-1">
        <div className="lg:col-span-1 xl:col-span-2 h-full min-h-[400px] md:min-h-0">
          <MainMap />
        </div>
        <div className="lg:col-span-1 h-full min-h-[400px] md:min-h-0">
          <AlertFeed />
        </div>
      </div>
    </div>
  );
}
