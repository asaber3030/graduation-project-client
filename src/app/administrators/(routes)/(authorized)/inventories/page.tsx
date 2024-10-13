import AdminPageTitle from "@/app/administrators/(helpers)/_components/common/title"

import { AdminInventoriesTable } from "@/app/administrators/(helpers)/_components/inventories/table"
import { SearchParams } from "@/types"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

import { paginateInventories } from "@/app/administrators/(helpers)/_actions/inventories"
import { LinkBtn } from "@/components/common/link-btn"
import { adminRoutes } from "@/app/administrators/(helpers)/_utils/routes"

export default async function InventoriesPage({ searchParams }: { searchParams: SearchParams }) {
  const inventories = await paginateInventories(searchParams)

  return (
    <div>
      <AdminPageTitle title="Inventories">
        <LinkBtn icon={Plus} variant="outline" href={adminRoutes.inventories.create}>
          Create
        </LinkBtn>
      </AdminPageTitle>

      <AdminInventoriesTable
        data={inventories.inventories}
        searchParams={searchParams}
        hasNextPage={true}
      />
    </div>
  )
}
