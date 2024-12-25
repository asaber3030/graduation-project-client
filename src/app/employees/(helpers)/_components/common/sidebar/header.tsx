"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AdminSidebarHeaderDropdown } from "./header-dropdown"
import { useAppSelector } from "@/store"
import { userImagePlaceholder } from "@/lib/constants"
import { useEmployee } from "../../../_hooks/useEmployee"

export const EmployeeSidebarHeader = () => {
  const employee = useEmployee()
  const sidebarActive = useAppSelector((state) => state.adminSidebar)

  if (sidebarActive) {
    return (
      <Avatar className="size-12 mb-4">
        <AvatarFallback className="bg-gray-200 font-medium">
          {employee?.name?.[0]}
          {employee?.name?.[1]}
        </AvatarFallback>
      </Avatar>
    )
  }

  return (
    <div className="p-4 shadow-sm rounded-md border">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={userImagePlaceholder} alt={employee.name} />
            <AvatarFallback>{employee.name?.[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-foreground">{employee.name}</span>
            <span className="text-xs">{employee.jobTitle}</span>
          </div>
        </div>
        <AdminSidebarHeaderDropdown />
      </div>
    </div>
  )
}
