"use client"

import React from "react"

import { useAppSelector } from "@/store"
import { cn } from "@/lib/utils"

import { AdminSidebarHeader } from "./header"
import { AdminSidebarItem } from "./item"
import { AdminSidebarGroup } from "./sidebar-group"
import { SidebarTrigger } from "./sidebar-trigger"

import { adminSidebarGroups } from "../../../_utils/lists"

export const AdminSidebar = () => {
  const sidebarState = useAppSelector((state) => state.adminSidebar)

  return (
    <aside
      className={cn(
        "bg-white h-screen border-r p-4 w-80 overflow-auto scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thin hidden xl:flex xl:justify-between xl:flex-col md:block",
        sidebarState && "w-20 overflow-hidden"
      )}
    >
      <div className="flex flex-col justify-between h-full">
        <section>
          <AdminSidebarHeader />
          <section className="divide-y">
            {adminSidebarGroups.map((group) => (
              <AdminSidebarGroup key={`group-${group.id}`} label={group.name}>
                {group.items.map((sidebarItem) => (
                  <AdminSidebarItem key={`admin-sidebar-item-${sidebarItem.id}`} {...sidebarItem} />
                ))}
              </AdminSidebarGroup>
            ))}
          </section>
        </section>
        <div className="flex justify-end mt-4">
          <SidebarTrigger />
        </div>
      </div>
    </aside>
  )
}
