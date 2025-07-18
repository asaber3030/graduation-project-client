import AdminPageTitle from "@/app/administrators/(helpers)/_components/common/title"

import { AdminCreateDepartmentModal } from "@/app/administrators/(helpers)/_components/departments/create-modal"
import { AdminEmployeesTable } from "@/app/administrators/(helpers)/_components/employees/table"
import { SearchParams } from "@/types"
import { Directions } from "@/app/administrators/(helpers)/_components/common/breadcrumb-directions"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

import { getDepartmentById } from "@/app/administrators/(helpers)/_actions/departments"
import { adminRoutes } from "@/app/administrators/(helpers)/_utils/routes"
import { notFound } from "next/navigation"

import { paginateEmployeesByDepartment } from "@/app/administrators/(helpers)/_actions/employees"

type Props = {
  searchParams: SearchParams
  params: {
    departmentId: string
  }
}

export default async function DepartmentIdEmployees({ searchParams, params }: Props) {
  const departmentId = +params.departmentId
  const department = await getDepartmentById(departmentId)
  const employees = await paginateEmployeesByDepartment(searchParams, departmentId)

  const breadcrumbs = [
    { href: adminRoutes.departments.root, label: "Departments", disabled: false },
    {
      href: adminRoutes.departments.view(departmentId),
      label: `Department ID: ${departmentId}`,
    },
    {
      href: adminRoutes.departments.departmentEmployees(departmentId),
      label: `Employees`,
      disabled: true,
    },
  ]

  if (!department) return notFound()

  const pageTitle = (
    <span>
      Department: <strong>{department.name}</strong> - Employees
    </span>
  )

  return (
    <div>
      <AdminPageTitle title={pageTitle}>
        <AdminCreateDepartmentModal asChild>
          <Button icon={Plus} variant="outline">
            Create
          </Button>
        </AdminCreateDepartmentModal>
      </AdminPageTitle>

      <Directions urls={breadcrumbs} />

      <AdminEmployeesTable
        searchParams={searchParams}
        hasNextPage={employees.hasNextPage}
        data={employees.employees}
      />
    </div>
  )
}
