"use client"

import Link from "next/link"
import React from "react"

import { usePathname } from "next/navigation"
import { useAppSelector } from "@/store"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  label: string
  url: string
  icon: LucideIcon
  children?: React.ReactNode
  hasItems?: boolean
}

export const AdminSidebarItem = ({ url, label, icon: Icon, children, hasItems = true }: Props) => {
  const sidebarActive = useAppSelector((state) => state.adminSidebar)
  const pathname = usePathname()
  const isActive = pathname.endsWith(url)

  if (sidebarActive) {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <Link
              href={url}
              className={cn(
                "flex gap-2 group items-center text-sm w-full font-semibold text-gray-700 hover:bg-gray-100 hover:text-black rounded-md transition-colors px-3 pr-0 [&:not(:last-of-type)]:mb-0.5 py-1.5",
                isActive && "bg-gray-100 text-black",
                sidebarActive && "justify-center text-center px-0 mb-4 py-2"
              )}
            >
              <Icon
                className={cn(
                  "size-4 text-gray-800 block group-hover:text-black transition-colors",
                  isActive && "bg-gray-100 text-black",
                  sidebarActive && "size-4"
                )}
              />
              {!sidebarActive && label}
            </Link>
          </TooltipTrigger>
          <TooltipContent
            sideOffset={10}
            side="right"
            className="bg-primary text-white border-transparent right-7 rounded-sm text-xs font-bold"
          >
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <Link
      href={url}
      className={cn(
        "flex gap-2 group items-center text-sm w-full font-semibold text-gray-700 hover:bg-gray-100 hover:text-black rounded-md transition-colors px-3 pr-0 [&:not(:last-of-type)]:mb-0.5 py-1",
        isActive && "bg-gray-100 text-black",
        sidebarActive && "justify-center text-center px-0 mb-4 py-2"
      )}
    >
      <Icon
        className={cn(
          "size-4 text-gray-800 block group-hover:text-black transition-colors",
          isActive && "bg-gray-100 text-black",
          sidebarActive && "size-4"
        )}
      />
      {!sidebarActive && label}
    </Link>
  )
}
