'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { ShieldCheck } from 'lucide-react';
import { SidebarNav } from '@/components/sidebar-nav';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const userAvatar = PlaceHolderImages.find(img => img.id === 'avatar-1');

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-6 text-primary" />
            <h2 className="text-lg font-semibold tracking-tighter text-foreground group-data-[collapsible=icon]:hidden font-headline">
              DigiSaarthi
            </h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-2">
            <Avatar className="size-7">
              {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User Avatar" data-ai-hint={userAvatar.imageHint}/>}
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-sm group-data-[collapsible=icon]:hidden">
              <span className="font-medium text-foreground">User</span>
              <span className="text-muted-foreground">user@example.com</span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="bg-background">
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="w-full flex-1">
            {/* Can add a search bar here if needed */}
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
