'use client';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Users,
  ShieldAlert,
  BarChart,
  UserCircle,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function SidebarNav() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Main</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/dashboard" legacyBehavior passHref>
              <SidebarMenuButton
                isActive={isActive('/dashboard')}
                tooltip="Dashboard"
              >
                <LayoutDashboard />
                Dashboard
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/profile" legacyBehavior passHref>
              <SidebarMenuButton
                isActive={isActive('/profile')}
                tooltip="My Profile"
              >
                <UserCircle />
                My Profile
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/trips" legacyBehavior passHref>
              <SidebarMenuButton isActive={isActive('/trips')} tooltip="My Trips">
                <Users />
                My Trips
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Safety</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/emergency" legacyBehavior passHref>
              <SidebarMenuButton
                isActive={isActive('/emergency')}
                tooltip="Emergency"
              >
                <ShieldAlert />
                Emergency
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Admin Tools</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/risk-assessment" legacyBehavior passHref>
              <SidebarMenuButton
                isActive={isActive('/risk-assessment')}
                tooltip="Risk Assessment"
              >
                <BarChart />
                Risk Assessment
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
}
