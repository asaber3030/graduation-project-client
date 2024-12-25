import AdminPageTitle from "@/app/administrators/(helpers)/_components/common/title"

import { AdminAdminsTable } from "@/app/administrators/(helpers)/_components/admins/table"
import { SearchParams } from "@/types"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

import { paginateAdmins } from "@/app/administrators/(helpers)/_actions/admin"
import { AdminCreateAdminModal } from "@/app/administrators/(helpers)/_components/admins/create-modal"

export default async function AdminsPage({ searchParams }: { searchParams: SearchParams }) {
  const admins = await paginateAdmins(searchParams)

  return (
    <div>
      <AdminPageTitle title="Admins">
        <AdminCreateAdminModal>
          <Button icon={Plus} variant="outline">
            Create
          </Button>
        </AdminCreateAdminModal>
      </AdminPageTitle>

      <AdminAdminsTable
        data={admins.admins}
        searchParams={searchParams}
        hasNextPage={admins.hasNextPage}
      />
    </div>
  )
}
