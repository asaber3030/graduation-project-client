import AdminPageTitle from "@/app/administrators/(helpers)/_components/common/title"

import { AdminCreateInventtoryModal } from "@/app/administrators/(helpers)/_components/inventories/create-form"

export default async function CreateInventoryPage() {
  return (
    <div>
      <AdminPageTitle title="Create Inventory" />

      <AdminCreateInventtoryModal />
    </div>
  )
}
