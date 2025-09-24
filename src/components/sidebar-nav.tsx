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
            <Link href="/dashboard" passHref>
              <SidebarMenuButton
                asChild
                isActive={isActive('/dashboard')}
                tooltip="Dashboard"
              >
                <span>
                  <LayoutDashboard />
                  Dashboard
                </span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/profile" passHref>
              <SidebarMenuButton
                asChild
                isActive={isActive('/profile')}
                tooltip="My Profile"
              >
                <span>
                  <UserCircle />
                  My Profile
                </span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/trips" passHref>
              <SidebarMenuButton asChild isActive={isActive('/trips')} tooltip="My Trips">
                <span>
                  <Users />
                  My Trips
                </span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Safety</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/emergency" passHref>
              <SidebarMenuButton
                asChild
                isActive={isActive('/emergency')}
                tooltip="Emergency"
              >
                <span>
                  <ShieldAlert />
                  Emergency
                </span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Admin Tools</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/risk-assessment" passHref>
              <SidebarMenuButton
                asChild
                isActive={isActive('/risk-assessment')}
                tooltip="Risk Assessment"
              >
                <span>
                  <BarChart />
                  Risk Assessment
                </span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
}
