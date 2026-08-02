import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenu as ShadSidebarMenu,
  SidebarMenuButton,
} from "../ui/sidebar";

export function SidebarMenu() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h1>Tu Calendario</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <ShadSidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Link href="/">Calendario</Link>
              </SidebarMenuButton>
              <SidebarMenuButton>
                <Link href="/agenda">Agenda</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </ShadSidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
