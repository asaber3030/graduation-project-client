import AdminPageTitle from "@/app/administrators/(helpers)/_components/common/title"
import FilterAll from "@/app/administrators/(helpers)/_components/common/filter"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { SearchParams } from "@/types"
import { DefaultTableFooter } from "@/app/administrators/(helpers)/_components/common/table-footer"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { diffForHuman } from "@/lib/utils"
import { EmptyState } from "@/components/common/empty-state"
import { paginateMedicine } from "@/app/administrators/(helpers)/_actions/medicine"

export default async function InventoriesPage({ searchParams }: { searchParams: SearchParams }) {
  const medicine = await paginateMedicine(searchParams)

  return (
    <div>
      <AdminPageTitle title="Medicine">
        <Button icon={Plus} variant="outline">
          Create
        </Button>
      </AdminPageTitle>

      <FilterAll
        searchParams={searchParams}
        orderByArray={[{ label: "Name", name: "name" }]}
        parentClassName="mb-4"
      />
      {medicine.medicine.length === 0 ? (
        <EmptyState />
      ) : (
        <section>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>EN Name</TableHead>
                <TableHead>AR Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Dosage Form</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Update</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medicine.medicine.map((medicine) => (
                <TableRow key={`medicine-row-${medicine.id}`}>
                  <TableCell className="font-medium">{medicine.id}</TableCell>
                  <TableCell>{medicine.enName}</TableCell>
                  <TableCell>{medicine.arName}</TableCell>
                  <TableCell>{medicine.price}</TableCell>
                  <TableCell>{medicine.dosageForm.name}</TableCell>
                  <TableCell>{diffForHuman(medicine.createdAt)}</TableCell>
                  <TableCell>{diffForHuman(medicine.updatedAt)}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button>View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <DefaultTableFooter searchParams={searchParams} hasNextPage={!medicine.hasNextPage} />
        </section>
      )}
    </div>
  )
}
