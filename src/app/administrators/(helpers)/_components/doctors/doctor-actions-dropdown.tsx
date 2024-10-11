import { Doctor, Hospital } from "@prisma/client"
import { Button } from "@/components/ui/button"
import {
  Box,
  Cog,
  LayoutPanelLeft,
  LayoutPanelTop,
  MoreHorizontal,
  NotepadTextDashed,
  Pickaxe,
  Trash,
  Users,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { CaretDownIcon } from "@radix-ui/react-icons"

type Props = {
  doctor: Doctor
}

export const DoctorActionsDropdown = ({ doctor }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button icon={MoreHorizontal} variant="outline" className="p-0 px-2" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Pickaxe className="size-4" /> Employees
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Box className="size-4" /> Inventories
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LayoutPanelTop className="size-4" /> Departments
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Users className="size-4" /> Patients
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NotepadTextDashed className="size-4" /> Prescriptions
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Trash className="size-4" /> Delete
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Cog className="size-4" /> Update
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
