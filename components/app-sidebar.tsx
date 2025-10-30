"use client";

import { Home, Settings2, RouteIcon } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { useAuthStore } from "@/store/auth";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user: userSession } = useAuthStore();

  const menus = {
    navMain: [
      {
        name: "dashboard",
        title: "Dashboard",
        url: "#",
        icon: Home,
        items: [
          {
            title: "Your Journey",
            url: "/dashboard",
          },
        ],
      },
      {
        name: "moods",
        title: "Moods Tracker",
        url: "#",
        icon: RouteIcon,
        items: [
          {
            title: "Memo",
            url: "/moods",
          },
        ],
      },
      {
        name: "setting",
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "General",
            url: "/setting",
          },
        ],
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser user={userSession} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menus.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
