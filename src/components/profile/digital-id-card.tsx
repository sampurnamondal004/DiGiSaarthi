'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ShieldCheck, User, Globe, Hash } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

type DigitalIdCardProps = {
  id: string;
  name: string;
  nationality: string;
  passport: string;
};

export function DigitalIdCard({ id, name, nationality, passport }: DigitalIdCardProps) {
    const userAvatar = PlaceHolderImages.find(img => img.id === 'avatar-1');
  
  return (
    <Card className="max-w-md w-full shadow-lg">
      <CardHeader className="bg-muted/50 rounded-t-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-primary" />
            <CardTitle className="text-lg font-headline">Digital Tourist ID</CardTitle>
          </div>
          <p className="text-xs font-mono bg-primary/10 text-primary p-1 rounded-md">VALID</p>
        </div>
        <CardDescription>This is a secure, temporary digital ID.</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center gap-6">
          <Avatar className="w-24 h-24 border-4 border-card">
            {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={name} data-ai-hint={userAvatar.imageHint}/>}
            <AvatarFallback className="text-3xl">{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-muted-foreground">{nationality}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 text-sm">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-muted-foreground text-xs">Name</p>
              <p className="font-medium">{name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-muted-foreground" />
             <div className="flex-1">
              <p className="text-muted-foreground text-xs">Nationality</p>
              <p className="font-medium">{nationality}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Hash className="w-5 h-5 text-muted-foreground" />
             <div className="flex-1">
              <p className="text-muted-foreground text-xs">Passport No. (Masked)</p>
              <p className="font-medium font-mono">{`****${passport.slice(-4)}`}</p>
            </div>
          </div>
        </div>
        <div className="text-center pt-4">
            <p className="text-muted-foreground text-xs mb-1">Unique ID</p>
            <p className="font-mono text-sm bg-muted p-2 rounded-md">{id}</p>
        </div>
      </CardContent>
    </Card>
  );
}
