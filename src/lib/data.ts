import type { Trip, Tourist, Alert, HighRiskZone } from './types';

export const tourists: Tourist[] = [
  { id: 'tourist-1', name: 'Alice', position: { lat: 28.6139, lng: 77.2090 } },
  { id: 'tourist-2', name: 'Bob', position: { lat: 28.6304, lng: 77.2177 } },
  { id: 'tourist-3', name: 'Charlie', position: { lat: 28.5245, lng: 77.1855 } },
  { id: 'tourist-4', name: 'Diana', position: { lat: 28.6562, lng: 77.2410 } },
];

export const highRiskZones: HighRiskZone[] = [
  {
    id: 'zone-1',
    name: 'High-Risk Zone Alpha',
    path: [
      { lat: 28.635, lng: 77.210 },
      { lat: 28.640, lng: 77.225 },
      { lat: 28.630, lng: 77.230 },
      { lat: 28.625, lng: 77.215 },
    ],
    riskLevel: 85,
  },
  {
    id: 'zone-2',
    name: 'Restricted Area Bravo',
    path: [
      { lat: 28.520, lng: 77.180 },
      { lat: 28.530, lng: 77.190 },
      { lat: 28.525, lng: 77.200 },
      { lat: 28.515, lng: 77.190 },
    ],
    riskLevel: 95,
  },
];

export const alerts: Alert[] = [
  {
    id: 'alert-1',
    touristId: 'tourist-2',
    touristName: 'Bob',
    type: 'Panic Button',
    message: 'Emergency button pressed near Connaught Place.',
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    location: { lat: 28.6304, lng: 77.2177 },
  },
  {
    id: 'alert-2',
    touristId: 'tourist-4',
    touristName: 'Diana',
    type: 'Geofence',
    message: 'Entered high-risk zone: Red Fort area.',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    location: { lat: 28.6562, lng: 77.2410 },
  },
  {
    id: 'alert-3',
    touristId: 'tourist-1',
    touristName: 'Alice',
    type: 'Location Drop-off',
    message: 'Sudden location signal loss near India Gate.',
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    location: { lat: 28.6129, lng: 77.2295 },
  },
];

export const trips: Trip[] = [
  {
    id: 'trip-101',
    name: 'Golden Triangle Tour',
    isArchived: false,
    members: [
      { id: 'member-1', name: 'John Doe', relation: 'Spouse' },
      { id: 'member-2', name: 'Jane Smith', relation: 'Friend' },
    ],
  },
  {
    id: 'trip-102',
    name: 'Mumbai Exploration',
    isArchived: false,
    members: [{ id: 'member-3', name: 'Peter Jones', relation: 'Brother' }],
  },
  {
    id: 'trip-103',
    name: 'Historical Delhi Trip',
    isArchived: true,
    members: [],
  },
];
