import AdminPageTitle from "@/app/administrators/(helpers)/_components/common/title"

import { AdminMedicineTable } from "@/app/administrators/(helpers)/_components/medicine/table"
import { SearchParams } from "@/types"
import { LinkBtn } from "@/components/common/link-btn"
import { Plus } from "lucide-react"

import { paginateMedicine } from "@/app/administrators/(helpers)/_actions/medicine"
import { adminRoutes } from "@/app/administrators/(helpers)/_utils/routes"
import { ATFullMedicine } from "@/app/administrators/(helpers)/_types"

export default async function InventoriesPage({ searchParams }: { searchParams: SearchParams }) {
  const medicine = await paginateMedicine(searchParams)

  return (
    <div>
      <AdminPageTitle title="Medicine">
        <LinkBtn icon={Plus} variant="outline" href={adminRoutes.medicine.create}>
          Create
        </LinkBtn>
      </AdminPageTitle>

      <AdminMedicineTable
        data={medicine.medicine as ATFullMedicine[]}
        hasNextPage={medicine.hasNextPage}
        searchParams={searchParams}
      />
    </div>
  )
}
