'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { trips as initialTrips } from '@/lib/data';
import type { Trip, TripMember } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Archive, PlusCircle, Trash2, UserPlus, Users, ArchiveRestore, Undo2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

function MemberItem({ member }: { member: TripMember }) {
    const avatar = PlaceHolderImages[Math.floor(Math.random() * PlaceHolderImages.length)];
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                    {avatar && <AvatarImage src={avatar.imageUrl} alt={member.name} data-ai-hint={avatar.imageHint} />}
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.relation}</p>
                </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
}


export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>(initialTrips);

  const toggleArchive = (tripId: string) => {
    setTrips(currentTrips =>
      currentTrips.map(trip =>
        trip.id === tripId ? { ...trip, isArchived: !trip.isArchived } : trip
      )
    );
  };
  
  const activeTrips = trips.filter(trip => !trip.isArchived);
  const archivedTrips = trips.filter(trip => trip.isArchived);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold font-headline">My Trips</h1>
            <p className="text-muted-foreground">
            Manage your trips and the members who can assist you in an emergency.
            </p>
        </div>
        <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Trip
        </Button>
      </header>
      
      <Card>
        <CardHeader>
            <CardTitle>Active Trips</CardTitle>
            <CardDescription>Your current and upcoming trips.</CardDescription>
        </CardHeader>
        <CardContent>
            {activeTrips.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                {activeTrips.map(trip => (
                    <AccordionItem value={trip.id} key={trip.id}>
                    <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-4 text-left">
                            <Users className="h-5 w-5 text-primary" />
                            <div>
                                <p className="font-semibold">{trip.name}</p>
                                <p className="text-sm text-muted-foreground">{trip.members.length} member(s)</p>
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                       <Separator />
                       <div className="space-y-4 pt-2">
                        {trip.members.length > 0 ? trip.members.map(member => (
                            <MemberItem key={member.id} member={member} />
                        )) : <p className="text-sm text-muted-foreground text-center">No members in this trip.</p>}
                       </div>
                       <Separator />
                       <div className="flex justify-between items-center pt-2">
                            <Button variant="outline">
                                <UserPlus className="mr-2 h-4 w-4" />
                                Add Member
                            </Button>
                            <Button variant="ghost" onClick={() => toggleArchive(trip.id)}>
                                <Archive className="mr-2 h-4 w-4" />
                                Archive Trip
                            </Button>
                       </div>
                    </AccordionContent>
                    </AccordionItem>
                ))}
                </Accordion>
            ) : (
                <p className="text-sm text-muted-foreground text-center py-8">You have no active trips.</p>
            )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Archived Trips</CardTitle>
            <CardDescription>Your past trips.</CardDescription>
        </CardHeader>
        <CardContent>
            {archivedTrips.length > 0 ? (
                 <div className="space-y-2">
                    {archivedTrips.map(trip => (
                         <div key={trip.id} className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                            <p className="font-medium text-muted-foreground">{trip.name}</p>
                            <Button variant="ghost" size="sm" onClick={() => toggleArchive(trip.id)}>
                                <Undo2 className="mr-2 h-4 w-4" />
                                Unarchive
                            </Button>
                         </div>
                    ))}
                 </div>
            ) : (
                <p className="text-sm text-muted-foreground text-center py-8">No archived trips.</p>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
