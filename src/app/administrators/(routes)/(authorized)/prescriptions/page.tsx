import AdminPageTitle from "@/app/administrators/(helpers)/_components/common/title"

import { AdminPrescriptionsTable } from "@/app/administrators/(helpers)/_components/prescriptions/table"
import { SearchParams } from "@/types"
import { LinkBtn } from "@/components/common/link-btn"
import { Plus } from "lucide-react"

import { paginatePrescriptions } from "@/app/administrators/(helpers)/_actions/prescriptions"
import { adminRoutes } from "@/app/administrators/(helpers)/_utils/routes"

export default async function Prescriptions({ searchParams }: { searchParams: SearchParams }) {
  const prescriptions = await paginatePrescriptions(searchParams)

  return (
    <div>
      <AdminPageTitle title="Prescriptions">
        <LinkBtn icon={Plus} variant="outline" href={adminRoutes.prescriptions.create}>
          Create
        </LinkBtn>
      </AdminPageTitle>

      <AdminPrescriptionsTable
        data={prescriptions.prescriptions}
        searchParams={searchParams}
        hasNextPage={prescriptions.hasNextPage}
      />
    </div>
  )
}
