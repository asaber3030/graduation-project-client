import AdminPageTitle from "@/app/administrators/(helpers)/_components/common/title"
import FilterAll from "@/app/administrators/(helpers)/_components/common/filter"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { SearchParams } from "@/types"
import { DefaultTableFooter } from "@/app/administrators/(helpers)/_components/common/table-footer"
import { EmptyState } from "@/components/common/empty-state"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { diffForHuman } from "@/lib/utils"
import { paginatePrescriptions } from "@/app/administrators/(helpers)/_actions/prescriptions"

export default async function Prescriptions({ searchParams }: { searchParams: SearchParams }) {
  const prescriptions = await paginatePrescriptions(searchParams)

  return (
    <div>
      <AdminPageTitle title="Prescriptions">
        <Button icon={Plus} variant="outline">
          Create
        </Button>
      </AdminPageTitle>

      <FilterAll
        searchParams={searchParams}
        orderByArray={[{ label: "Name", name: "name" }]}
        parentClassName="mb-4"
      />
      {prescriptions.prescriptions.length === 0 ? (
        <EmptyState />
      ) : (
        <section>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Update</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prescriptions.prescriptions.map((prescription) => (
                <TableRow key={`doctor-row-${prescription.id}`}>
                  <TableCell className="font-medium">{prescription.id}</TableCell>
                  <TableCell>{prescription.doctor.name}</TableCell>
                  <TableCell>{prescription.patient.name}</TableCell>
                  <TableCell>{diffForHuman(prescription.createdAt)}</TableCell>
                  <TableCell>{diffForHuman(prescription.updatedAt)}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button>Update</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <DefaultTableFooter
            searchParams={searchParams}
            hasNextPage={!prescriptions.hasNextPage}
          />
        </section>
      )}
    </div>
  )
}
