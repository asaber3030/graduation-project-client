import React from "react"
import AdminPageTitle from "@/app/administrators/(helpers)/_components/common/title"

import db from "@/services/prisma"

import { AdminCreatePermissionGroupModal } from "@/app/administrators/(helpers)/_components/permissions/create-permission-group-modal"
import { PermissionGroupContainer } from "@/app/administrators/(helpers)/_components/permissions/permission-group-container"
import { EmptyState } from "@/components/common/empty-state"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default async function PermissionsPage() {
  const permissionGroups = await db.resourcePermissionGroup.findMany({
    include: {
      permissions: true,
    },
  })

  return (
    <div>
      <AdminPageTitle title="Permission Groups">
        <AdminCreatePermissionGroupModal asChild>
          <Button icon={Plus}>Create Group</Button>
        </AdminCreatePermissionGroupModal>
      </AdminPageTitle>
      {permissionGroups.length > 0 ? (
        <div className="grid xl:grid-cols-2 gap-2 grid-cols-1">
          {permissionGroups.map((group) => (
            <PermissionGroupContainer key={`group-${group.id}`} permissionGroup={group} />
          ))}
        </div>
      ) : (
        <EmptyState title="No Permission Groups available." />
      )}
    </div>
  )
}
