'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { AppLogo } from '@/components/app-logo';
import { LogIn, UserPlus } from 'lucide-react';
import { toolCatalog } from '@/lib/tool-catalog';

export function SidebarNav() {
  const pathname = usePathname();
  const menuGroups = ['General', 'Writer', 'Tools', 'Education'] as const;

  return (
    <>
      <SidebarHeader className="bg-sidebar-primary p-4 group-data-[state=expanded]:h-auto">
        <Link href="/dashboard">
          <AppLogo />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuGroups.map((group) => (
            <SidebarGroup key={group}>
              <SidebarGroupLabel>{group}</SidebarGroupLabel>
              {toolCatalog
                .filter((item) => item.group === group)
                .map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.href === '/dashboard' ? pathname === item.href : pathname.startsWith(item.href)}
                    tooltip={{ children: item.isAvailable ? item.title : `${item.title} • ${item.launchLabel ?? 'Coming soon'}`, side: 'right' }}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarGroup>
          ))}
        </SidebarMenu>
      </SidebarContent>
       <SidebarFooter>
        <SidebarSeparator />
        <SidebarMenu className="p-2">
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={{ children: 'Sign In', side: 'right' }}>
              <Link href="/login">
                <LogIn />
                <span>Sign In</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={{ children: 'Sign Up', side: 'right' }}>
              <Link href="/signup">
                <UserPlus />
                <span>Sign Up</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}