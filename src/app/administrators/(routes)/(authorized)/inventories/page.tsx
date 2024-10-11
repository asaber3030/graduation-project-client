import AdminPageTitle from "@/app/administrators/(helpers)/_components/common/title"
import FilterAll from "@/app/administrators/(helpers)/_components/common/filter"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Cog, Plus, Trash } from "lucide-react"
import { SearchParams } from "@/types"
import { DefaultTableFooter } from "@/app/administrators/(helpers)/_components/common/table-footer"
import { paginateHospitals } from "@/app/administrators/(helpers)/_actions/hospitals"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { diffForHuman } from "@/lib/utils"
import { HospitalActionsDropdown } from "@/app/administrators/(helpers)/_components/hospitals/hospital-actions-dropdown"
import { EmptyState } from "@/components/common/empty-state"
import { paginateDoctors } from "@/app/administrators/(helpers)/_actions/doctors"
import { userImagePlaceholder } from "@/lib/constants"
import Link from "next/link"
import { DoctorActionsDropdown } from "@/app/administrators/(helpers)/_components/doctors/doctor-actions-dropdown"
import { paginateInventories } from "@/app/administrators/(helpers)/_actions/inventories"

export default async function InventoriesPage({ searchParams }: { searchParams: SearchParams }) {
  const inventories = await paginateInventories(searchParams)

  return (
    <div>
      <AdminPageTitle title="Inventories">
        <Button icon={Plus} variant="outline">
          Create
        </Button>
      </AdminPageTitle>

      <FilterAll
        searchParams={searchParams}
        orderByArray={[{ label: "Name", name: "name" }]}
        parentClassName="mb-4"
      />
      {inventories.inventories.length === 0 ? (
        <EmptyState />
      ) : (
        <section>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Last Update</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventories.inventories.map((inventory) => (
                <TableRow key={`inventory-row-${inventory.id}`}>
                  <TableCell className="font-medium">{inventory.id}</TableCell>
                  <TableCell>{inventory.name}</TableCell>
                  <TableCell>{inventory.department.name}</TableCell>
                  <TableCell>{inventory.code}</TableCell>
                  <TableCell>{diffForHuman(inventory.updatedAt)}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button>View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <DefaultTableFooter searchParams={searchParams} hasNextPage={!inventories.hasNextPage} />
        </section>
      )}
    </div>
  )
}
