"use client"

import { cn } from "@/lib/utils"
import { adminRoutes } from "../../../_utils/routes"

import { useAppSelector } from "@/store"

import { AdminNavbarUserDropdown } from "./user-dropdown"
import { AdminNavbarNotificationDropdown } from "./notifications-dropdown"
import { AdminNavbarCreateDropdown } from "./create-dropdown"
import { AdminNavbarSettingsDropdown } from "./settings-dropdown"

import Link from "next/link"

export const AdminNavbar = () => {
  const sidebarActive = useAppSelector((state) => state.adminSidebar)

  return (
    <div
      className={cn(
        "print:hidden w-full bg-white shadow-sm p-4 flex justify-between items-center",
        !sidebarActive && "pr-10",
        sidebarActive && "pr-10"
      )}
    >
      <Link
        className="text-lg font-bold first-letter:text-primary"
        href={adminRoutes.dashboard.root}
      >
        Techmed
      </Link>

      <div className="flex gap-6">
        <div className="flex gap-2">
          <AdminNavbarSettingsDropdown />
          <AdminNavbarCreateDropdown />
          <AdminNavbarNotificationDropdown />
        </div>
        <AdminNavbarUserDropdown />
      </div>
    </div>
  )
}
