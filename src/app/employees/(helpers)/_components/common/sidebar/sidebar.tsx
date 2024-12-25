"use client"

import React, { useContext } from "react"

import { useAppSelector } from "@/store"
import { cn } from "@/lib/utils"

import { SidebarTrigger } from "./sidebar-trigger"

import { EmployeeSidebarHeader } from "./header"
import { EmployeePermissionsContext } from "../../../_providers/permissions-provider"
import { resourcesIcons } from "@/lib/constants"
import { adminGlobalIcons } from "../../../_utils/constants"
import { EmployeeSidebarGroup } from "./sidebar-group"
import { EmployeeSidebarItem } from "./item"

export const EmployeeSidebar = () => {
  const sidebarState = useAppSelector((state) => state.adminSidebar)
  const permissions = useContext(EmployeePermissionsContext)

  return (
    <aside
      className={cn(
        "bg-white h-screen border-r p-4 w-80 overflow-auto scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thin hidden xl:flex xl:justify-between xl:flex-col md:block",
        sidebarState && "w-20 overflow-hidden"
      )}
    >
      <div className="flex flex-col justify-between h-full">
        <section>
          <EmployeeSidebarHeader />
          <section className="divide-y">
            <EmployeeSidebarGroup label="Resources">
              {permissions.map((group) => {
                const Icon = adminGlobalIcons[group.groupIcon as keyof typeof adminGlobalIcons]
                return <EmployeeSidebarItem label={group.groupName} icon={Icon} url="/" />
              })}
            </EmployeeSidebarGroup>
          </section>
        </section>
        <div className="flex justify-end mt-4">
          <SidebarTrigger />
        </div>
      </div>
    </aside>
  )
}
