"use client"

import { Doctor, Patient } from "@prisma/client"
import { Button } from "@/components/ui/button"
import {
  Box,
  Cog,
  Eye,
  LayoutPanelTop,
  MoreHorizontal,
  NotepadTextDashed,
  Pickaxe,
  Pill,
  Syringe,
  Trash,
  Users,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

import { useRouter } from "next/navigation"
import { adminRoutes } from "../../_utils/routes"

type Props = {
  doctor: Doctor
}

export const AdminDoctorActionsDropdown = ({ doctor }: Props) => {
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button icon={MoreHorizontal} variant="outline" className="p-0 px-2" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => router.push(adminRoutes.doctors.view(doctor.id))}>
          <Eye className="size-4" /> View
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Trash className="size-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
