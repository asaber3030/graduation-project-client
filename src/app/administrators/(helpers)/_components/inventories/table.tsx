import Link from "next/link"
import FilterAll from "@/app/administrators/(helpers)/_components/common/filter"

import { SearchParams } from "@/types"
import { ATFullInventory } from "../../_types"
import { DefaultTableFooter } from "@/app/administrators/(helpers)/_components/common/table-footer"
import { OrderBy } from "../../_utils/order-by"
import { EmptyState } from "@/components/common/empty-state"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { diffForHuman, showHospitalName } from "@/lib/utils"
import { adminRoutes } from "../../_utils/routes"
import { AdminInventoryActionsDropdown } from "./actions-dropdown"
import { Delete, Trash } from "lucide-react"
import { DeleteModal } from "../common/delete-modal"
import { deleteInventoryAction } from "../../_actions/inventories"
import { Button } from "@/components/ui/button"

type Props = {
  data: ATFullInventory[]
  searchParams: SearchParams
  hasNextPage: boolean
  showFilters?: boolean
}

export const AdminInventoriesTable = ({
  showFilters = true,
  hasNextPage,
  searchParams,
  data,
}: Props) => {
  return (
    <>
      {showFilters && (
        <FilterAll
          searchParams={searchParams}
          orderByArray={OrderBy.inventories}
          parentClassName="mb-4"
        />
      )}
      {data.length === 0 ? (
        <EmptyState />
      ) : (
        <section>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Hospital</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Last Update</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((inventory) => (
                <TableRow key={`inventory-row-${inventory.id}`}>
                  <TableCell className="font-medium">{inventory.id}</TableCell>
                  <TableCell>{inventory.name}</TableCell>
                  <TableCell>{inventory.code}</TableCell>
                  <TableCell>
                    <Link
                      className="text-blue-500"
                      href={adminRoutes.hospitals.view(inventory.hospital.id)}
                    >
                      {showHospitalName(inventory.hospital)}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      className="text-blue-500"
                      href={adminRoutes.departments.view(inventory.department.id)}
                    >
                      {inventory.department.name}
                    </Link>
                  </TableCell>
                  <TableCell>{diffForHuman(inventory.updatedAt)}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <DeleteModal deletedId={inventory.id} forceAction={deleteInventoryAction}>
                      <Button variant="destructive" icon={Trash}>
                        Delete
                      </Button>
                    </DeleteModal>
                    <AdminInventoryActionsDropdown inventory={inventory} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <DefaultTableFooter searchParams={searchParams} hasNextPage={!hasNextPage} />
        </section>
      )}
    </>
  )
}
