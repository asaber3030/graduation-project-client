import AdminPageTitle from "@/app/administrators/(helpers)/_components/common/title"

import { getPermissionsByGroupId } from "@/app/administrators/(helpers)/_actions/permissions"
import { getPermissionGroupById } from "@/app/administrators/(helpers)/_actions/permissions-groups"
import { notFound } from "next/navigation"

import { AdminCreatePermissionModal } from "@/app/administrators/(helpers)/_components/permissions/create-permission-modal"
import { AdminPermissionsTable } from "@/app/administrators/(helpers)/_components/permissions/permissions-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

type Props = {
  params: {
    groupId: string
  }
}

export default async function PermissionGroupIdPage({ params }: Props) {
  const groupId = +params.groupId
  const group = await getPermissionGroupById(groupId)

  const permissions = await getPermissionsByGroupId(groupId)

  if (!group) notFound()

  const pageTitle = (
    <span className="flex gap-2 items-center">
      {group.groupName} - Group Permission
      <span className="text-gray-500">contains ({group.permissions.length} permissions)</span>
    </span>
  )

  return (
    <div>
      <AdminPageTitle title={pageTitle}>
        <div className="flex gap-2 items-center">
          <AdminCreatePermissionModal asChild groupId={group.id}>
            <Button icon={Plus} variant="outline">
              Create Permission
            </Button>
          </AdminCreatePermissionModal>
        </div>
      </AdminPageTitle>

      <AdminPermissionsTable permissions={permissions} />
    </div>
  )
}
