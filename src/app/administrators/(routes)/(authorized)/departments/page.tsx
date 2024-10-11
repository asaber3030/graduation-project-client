import AdminPageTitle from "@/app/administrators/(helpers)/_components/common/title"
import FilterAll from "@/app/administrators/(helpers)/_components/common/filter"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Cog, Eye, Plus, Trash } from "lucide-react"
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
import { EmptyState } from "@/components/common/empty-state"

import { diffForHuman } from "@/lib/utils"
import { paginateDepartments } from "@/app/administrators/(helpers)/_actions/departments"
import { adminRoutes } from "@/app/administrators/(helpers)/_utils/routes"

import Link from "next/link"

export default async function Departments({ searchParams }: { searchParams: SearchParams }) {
  const departments = await paginateDepartments(searchParams)

  return (
    <div>
      <AdminPageTitle title="Departments">
        <Button icon={Plus} variant="outline">
          Create
        </Button>
      </AdminPageTitle>

      <FilterAll
        searchParams={searchParams}
        orderByArray={[{ label: "Name", name: "name" }]}
        parentClassName="mb-4"
      />

      {departments.departments.length === 0 ? (
        <EmptyState />
      ) : (
        <section>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Last Update</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.departments.map((department) => (
                <TableRow key={`department-row-${department.id}`}>
                  <TableCell className="font-medium">{department.id}</TableCell>
                  <TableCell>{department.name}</TableCell>
                  <TableCell>{diffForHuman(department.updatedAt)}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button icon={Eye} variant="outline">
                      View
                    </Button>
                    <Button icon={Cog} variant="blue">
                      Update
                    </Button>
                    <Button icon={Trash} variant="destructive">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <DefaultTableFooter searchParams={searchParams} hasNextPage={!departments.hasNextPage} />
        </section>
      )}
    </div>
  )
}
