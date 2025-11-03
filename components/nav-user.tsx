"use client";

import { BadgeCheck, ChevronsUpDown, LogOut, Moon, Sun, Computer, Check } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import Link from "next/link";
// import { useTheme } from "next-themes";

import { useAuthStore } from "@/store/auth";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
}) {
  const { logout: logoutSession } = useAuthStore();
  // const { setTheme, theme } = useTheme();

  const logout = async () => {
    await logoutSession();

    redirect("/auth/sign-in");
  };

  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="rounded-lg font-bold">
                  {`${user?.name
                    .split(" ")
                    .slice(0, 2)
                    .map((word) => word.charAt(0).toUpperCase())
                    .join("")}`}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.name}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg" side={isMobile ? "bottom" : "right"} align="end" sideOffset={4}>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="rounded-lg">
                    {`${user?.name
                      .split(" ")
                      .slice(0, 2)
                      .map((word) => word.charAt(0).toUpperCase())
                      .join("")}`}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/my-profile">
                <DropdownMenuItem>
                  <BadgeCheck />
                  Account
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {/* <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun />
                Light
                {theme && theme === "light" && <Check className="ml-2" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon />
                Dark
                {theme && theme === "dark" && <Check className="ml-2" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Computer />
                System
                {theme && theme === "system" && <Check className="ml-2" />}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem onClick={logout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
