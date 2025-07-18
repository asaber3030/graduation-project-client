import AdminPageTitle from "@/app/administrators/(helpers)/_components/common/title"

import { getPermissionGroupsWithPermissions } from "@/app/administrators/(helpers)/_actions/permissions-groups"
import { findEmployee } from "@/app/administrators/(helpers)/_actions/employees"
import { notFound } from "next/navigation"

import { AdminResourcePermissionGroupForEmployee } from "@/app/administrators/(helpers)/_components/employees/permission/permission-group-container"
import { GrantAllPermissionsToEmployeeButton } from "@/app/administrators/(helpers)/_components/employees/permission/grant-all"
import { Button } from "@/components/ui/button"
import { RemoveAllPermissionsFromEmployeeButton } from "@/app/administrators/(helpers)/_components/employees/permission/remove-all"
import { adminRoutes } from "@/app/administrators/(helpers)/_utils/routes"
import { Directions } from "@/app/administrators/(helpers)/_components/common/breadcrumb-directions"

type Props = {
  searchParams: any
  params: {
    employeeId: string
  }
}

export default async function EmployeeIdPermissions({ params, searchParams }: Props) {
  const employeeId = +params.employeeId
  const employee = await findEmployee({ id: employeeId })

  if (!employee) return notFound()

  const permissionGroups = await getPermissionGroupsWithPermissions()

  const pageTitle = (
    <span className="flex gap-2 items-center">
      Employee
      <b>
        {employee.name}#{employee.id}
      </b>
      - Permissions
    </span>
  )
  const breadcrumbs = [
    { href: adminRoutes.employees.root, label: "Employees" },
    {
      href: adminRoutes.employees.view(employeeId),
      label: `Employee ID: ${employeeId}`,
      isBold: true,
    },
    { href: adminRoutes.employees.employeeLogs(employeeId), label: `Permissions`, disabled: true },
  ]

  return (
    <div>
      <AdminPageTitle title={pageTitle}>
        <GrantAllPermissionsToEmployeeButton employeeId={employeeId}>
          <Button variant="outline">Grant all permissions</Button>
        </GrantAllPermissionsToEmployeeButton>

        <RemoveAllPermissionsFromEmployeeButton employeeId={employeeId}>
          <Button variant="destructive">Remove all permissions</Button>
        </RemoveAllPermissionsFromEmployeeButton>
      </AdminPageTitle>

      <Directions urls={breadcrumbs} />

      <section className="space-y-2">
        {permissionGroups.map((group) => (
          <AdminResourcePermissionGroupForEmployee
            key={`group-${group.id}`}
            employeeId={employeeId}
            group={group}
          />
        ))}
      </section>
    </div>
  )
}
