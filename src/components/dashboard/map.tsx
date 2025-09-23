'use client';

import { useState, useEffect } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  Polygon,
} from '@vis.gl/react-google-maps';
import { tourists, highRiskZones } from '@/lib/data';
import type { Tourist, HighRiskZone } from '@/lib/types';
import { Card } from '../ui/card';
import { AlertCircle } from 'lucide-react';

function TouristMarker({ tourist }: { tourist: Tourist }) {
  const [infowindowOpen, setInfowindowOpen] = useState(false);

  return (
    <>
      <AdvancedMarker
        position={tourist.position}
        onClick={() => setInfowindowOpen(true)}
      >
        <Pin
          background={'#29ABE2'}
          borderColor={'#1A98C9'}
          glyphColor={'#FFFFFF'}
        />
      </AdvancedMarker>
      {infowindowOpen && (
        <InfoWindow
          position={tourist.position}
          onCloseClick={() => setInfowindowOpen(false)}
        >
          <p className="font-semibold">{tourist.name}</p>
        </InfoWindow>
      )}
    </>
  );
}

function RiskZonePolygon({ zone }: { zone: HighRiskZone }) {
  const isHighRisk = zone.riskLevel > 80;
  return (
    <Polygon
      paths={zone.path}
      strokeColor={isHighRisk ? '#FF0000' : '#FFA500'}
      strokeOpacity={0.8}
      strokeWeight={2}
      fillColor={isHighRisk ? '#FF0000' : '#FFA500'}
      fillOpacity={0.25}
    />
  );
}

export function MainMap() {
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || null);
  }, []);
  
  const position = { lat: 28.6139, lng: 77.2090 }; // Centered on Delhi

  if (!apiKey) {
    return (
      <Card className="h-full flex items-center justify-center p-8">
        <div className="text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
            <h3 className="mt-4 text-lg font-medium">Google Maps API Key is missing.</h3>
            <p className="mt-2 text-sm text-muted-foreground">
                Please add your NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env.local file to enable map functionality.
            </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="w-full h-full rounded-lg overflow-hidden border">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={position}
          defaultZoom={12}
          mapId="digi-saarthi-map"
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        >
          {tourists.map((tourist) => (
            <TouristMarker key={tourist.id} tourist={tourist} />
          ))}
          {highRiskZones.map((zone) => (
            <RiskZonePolygon key={zone.id} zone={zone} />
          ))}
        </Map>
      </APIProvider>
    </div>
  );
}
