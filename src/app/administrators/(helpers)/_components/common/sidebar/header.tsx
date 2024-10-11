"use client"

import Link from "next/link"

import { useContext } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AdminSidebarHeaderDropdown } from "./header-dropdown"
import { useAppSelector } from "@/store"
import { AdminContext } from "../../../_providers/admin-provider"
import { useAdmin } from "../../../_hooks/useAdmin"
import { userImagePlaceholder } from "@/lib/constants"

export const AdminSidebarHeader = () => {
  const admin = useAdmin()
  const sidebarActive = useAppSelector((state) => state.adminSidebar)

  if (sidebarActive) {
    return (
      <Avatar className="size-12 mb-4">
        <AvatarFallback className="bg-gray-200 font-medium">
          {admin?.name?.[0]}
          {admin?.name?.[1]}
        </AvatarFallback>
      </Avatar>
    )
  }

  return (
    <div className="p-4 shadow-sm rounded-md border">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={userImagePlaceholder} alt={admin.name} />
            <AvatarFallback>{admin.name?.[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-foreground">{admin.name}</span>
            <span className="text-xs">Mr. CEO Founder</span>
          </div>
        </div>
        <AdminSidebarHeaderDropdown />
      </div>
    </div>
  )
}
