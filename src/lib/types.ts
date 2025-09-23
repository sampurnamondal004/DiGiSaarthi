export type LatLng = {
  lat: number;
  lng: number;
};

export type Tourist = {
  id: string;
  name: string;
  position: LatLng;
};

export type HighRiskZone = {
  id: string;
  name: string;
  path: LatLng[];
  riskLevel: number;
};

export type Alert = {
  id: string;
  touristId: string;
  touristName: string;
  type: 'Panic Button' | 'Geofence' | 'Location Drop-off' | 'System';
  message: string;
  timestamp: string;
  location: LatLng;
};

export type TripMember = {
  id: string;
  name: string;
  relation: string;
};

export type Trip = {
  id: string;
  name: string;
  isArchived: boolean;
  members: TripMember[];
};
