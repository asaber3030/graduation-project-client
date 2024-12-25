import AdminPageTitle from "@/app/administrators/(helpers)/_components/common/title"
import React from "react"

import {
  getPermissionById,
  paginateEmployeesByPermissionId,
} from "@/app/administrators/(helpers)/_actions/permissions"
import { getPermissionGroupById } from "@/app/administrators/(helpers)/_actions/permissions-groups"
import { notFound } from "next/navigation"

import { AdminQuickAssignPermissionToEmployeeModal } from "@/app/administrators/(helpers)/_components/permissions/quick-assign-permission-modal"
import { AdminUpdatePermissionModal } from "@/app/administrators/(helpers)/_components/permissions/update-permission-modal"
import { AdminPermissionEmployees } from "@/app/administrators/(helpers)/_components/permissions/permission-employees-table"
import { SearchParams } from "@/types"
import { UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"

type Props = {
  params: {
    groupId: string
    permissionId: string
  }
  searchParams: SearchParams
}

export default async function PermissionIdPage({ params, searchParams }: Props) {
  const groupId = +params.groupId
  const permissionId = +params.permissionId

  const group = await getPermissionGroupById(groupId)
  const permission = await getPermissionById(permissionId)

  if (!group || !permission || permission.groupId != group.id) return notFound()

  const employeePermissions = await paginateEmployeesByPermissionId(permissionId, searchParams)

  const pageTitle = (
    <span>
      Permission <b>{permission.permissionName}</b> - Code <b>{permission.permissionCode}</b>
    </span>
  )

  return (
    <div>
      <AdminPageTitle title={pageTitle}>
        <AdminQuickAssignPermissionToEmployeeModal permission={permission} asChild>
          <Button icon={UserPlus}>Quick Assign to</Button>
        </AdminQuickAssignPermissionToEmployeeModal>
        <AdminUpdatePermissionModal permission={permission} asChild>
          <Button variant="outline">Update</Button>
        </AdminUpdatePermissionModal>
      </AdminPageTitle>

      <AdminPermissionEmployees
        searchParams={searchParams}
        data={employeePermissions.employees}
        hasNextPage={employeePermissions.hasNextPage}
      />
    </div>
  )
}
