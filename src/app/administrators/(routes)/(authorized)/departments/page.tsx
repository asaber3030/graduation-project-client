import AdminPageTitle from "@/app/administrators/(helpers)/_components/common/title"

import { AdminCreateDepartmentModal } from "@/app/administrators/(helpers)/_components/departments/create-modal"
import { AdminDepartmentsTable } from "@/app/administrators/(helpers)/_components/departments/table"
import { SearchParams } from "@/types"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

import { paginateDepartments } from "@/app/administrators/(helpers)/_actions/departments"

export default async function Departments({ searchParams }: { searchParams: SearchParams }) {
  const departments = await paginateDepartments(searchParams)

  return (
    <div>
      <AdminPageTitle title="Departments">
        <AdminCreateDepartmentModal asChild>
          <Button icon={Plus} variant="outline">
            Create
          </Button>
        </AdminCreateDepartmentModal>
      </AdminPageTitle>

      <AdminDepartmentsTable
        searchParams={searchParams}
        hasNextPage={departments.hasNextPage}
        data={departments.departments}
      />
    </div>
  )
}
