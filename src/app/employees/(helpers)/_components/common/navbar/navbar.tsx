"use client"

import { cn } from "@/lib/utils"
import { adminRoutes } from "../../../_utils/routes"

import { useAppSelector } from "@/store"
import Link from "next/link"
import { employeesRoutes } from "../../../_utils/employees.routes"

export const EmployeeNavbar = () => {
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
        href={employeesRoutes.dashboard.root}
      >
        Techmed
      </Link>
    </div>
  )
}
