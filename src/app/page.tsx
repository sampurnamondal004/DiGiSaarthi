import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Map, Bell, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-card border-b">
        <Link href="#" className="flex items-center justify-center gap-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tighter font-headline">DigiSaarthi</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
            <Button>Launch App</Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background relative">
          <div className="absolute inset-0 z-0">
            <Image 
              src="/bg-pattern.svg" 
              alt="Background pattern"
              fill
              className="object-cover opacity-50"
            />
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline text-primary">
                    Travel with Confidence
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    DigiSaarthi is your digital companion, providing AI-powered safety insights, real-time alerts, and instant emergency assistance for a secure journey.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/dashboard"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Enter Dashboard
                  </Link>
                </div>
              </div>
              <Image
                src="https://picsum.photos/seed/travel-app/600/600"
                data-ai-hint="travel mobile app"
                width="600"
                height="600"
                alt="Hero"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Your Safety, Simplified</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Powerful tools designed to keep you safe and informed wherever your travels take you.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16 mt-12">
              <div className="grid gap-1 text-center">
                <Map className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">AI Risk Assessment</h3>
                <p className="text-sm text-muted-foreground">
                  View real-time risk levels on a heatmap, powered by AI analysis of weather, traffic, and incident reports.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <Bell className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">Geofencing Alerts</h3>
                <p className="text-sm text-muted-foreground">
                  Receive instant notifications when you enter high-risk or restricted zones.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <div className="w-10 h-10 mx-auto rounded-full bg-accent flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-accent-foreground"></div>
                </div>
                <h3 className="text-lg font-bold font-headline">Emergency Button</h3>
                <p className="text-sm text-muted-foreground">
                  One-press alert to share your live location with contacts and authorities in an emergency.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <Users className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">Digital Tourist ID</h3>
                <p className="text-sm text-muted-foreground">
                  Generate a secure, temporary digital ID for hassle-free verification during your trip.
                </p>
              </div>
               <div className="grid gap-1 text-center">
                <ShieldCheck className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">Trip Management</h3>
                <p className="text-sm text-muted-foreground">
                  Organize your trips and add trusted members who can act on your behalf in an emergency.
                </p>
              </div>
               <div className="grid gap-1 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 mx-auto text-primary"><path d="M12 22h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10"/><path d="M14 16a2 2 0 1 0-4 0"/><path d="m14 12-4 4"/><path d="M12 8v4"/><path d="m10 12 4 4"/></svg>
                <h3 className="text-lg font-bold font-headline">Admin Dashboard</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor tourist locations and recent alerts through a centralized command center.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-card">
        <p className="text-xs text-muted-foreground">&copy; 2024 DigiSaarthi. All rights reserved.</p>
      </footer>
    </div>
  );
}
