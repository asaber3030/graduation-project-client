import AdminPageTitle from "@/app/administrators/(helpers)/_components/common/title"
import FilterAll from "@/app/administrators/(helpers)/_components/common/filter"
import Image from "next/image"
import Link from "next/link"

import { PatientActionsDropdown } from "@/app/administrators/(helpers)/_components/patients/patient-actions-dropdown"
import { DefaultTableFooter } from "@/app/administrators/(helpers)/_components/common/table-footer"
import { EmptyState } from "@/components/common/empty-state"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { SearchParams } from "@/types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { diffForHuman, formatDate } from "@/lib/utils"
import { userImagePlaceholder } from "@/lib/constants"
import { paginatePatients } from "@/app/administrators/(helpers)/_actions/patients"
import { adminRoutes } from "@/app/administrators/(helpers)/_utils/routes"

export default async function Patients({ searchParams }: { searchParams: SearchParams }) {
  const patients = await paginatePatients(searchParams)

  return (
    <div>
      <AdminPageTitle title="Patients">
        <Link href={adminRoutes.patients.create}>
          <Button icon={Plus} variant="outline">
            Create
          </Button>
        </Link>
      </AdminPageTitle>

      <FilterAll
        searchParams={searchParams}
        orderByArray={[{ label: "Name", name: "name" }]}
        parentClassName="mb-4"
      />

      {patients.patients.length === 0 ? (
        <EmptyState />
      ) : (
        <section>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Birth date</TableHead>
                <TableHead>Profile</TableHead>
                <TableHead>Last Update</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.patients.map((patient) => (
                <TableRow key={`doctor-row-${patient.id}`}>
                  <TableCell className="font-medium">{patient.id}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>
                    {patient.birthDate ? formatDate(patient.birthDate, "l") : "N/A"}
                  </TableCell>
                  <TableCell>
                    <Image src={userImagePlaceholder} width={40} height={40} alt="doctor Logo" />
                  </TableCell>
                  <TableCell>{diffForHuman(patient.updatedAt)}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <PatientActionsDropdown patient={patient} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <DefaultTableFooter searchParams={searchParams} hasNextPage={!patients.hasNextPage} />
        </section>
      )}
    </div>
  )
}
