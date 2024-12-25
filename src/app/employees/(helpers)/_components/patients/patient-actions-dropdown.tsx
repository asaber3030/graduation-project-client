"use client"

import { Patient } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Cog, Eye, MoreHorizontal, NotepadTextDashed, Pill, Syringe, Trash } from "lucide-react"
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
  patient: Patient
}

export const PatientActionsDropdown = ({ patient }: Props) => {
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button icon={MoreHorizontal} variant="outline" className="p-0 px-2" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => router.push(adminRoutes.patients.view(patient.id))}>
          <Eye className="size-4" /> View
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(adminRoutes.patients.patientPrescriptions(patient.id))}
        >
          <NotepadTextDashed className="size-4" /> Prescriptions
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(adminRoutes.patients.patientMedications(patient.id))}
        >
          <Pill className="size-4" /> Medications
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(adminRoutes.patients.patientVaccinations(patient.id))}
        >
          <Syringe className="size-4" /> Vaccinations
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => router.push(adminRoutes.patients.update(patient.id))}>
          <Cog className="size-4" /> Update
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Trash className="size-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
