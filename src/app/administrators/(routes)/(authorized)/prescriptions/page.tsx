import AdminPageTitle from "@/app/administrators/(helpers)/_components/common/title"

import { AdminPrescriptionsTable } from "@/app/administrators/(helpers)/_components/prescriptions/table"
import { SearchParams } from "@/types"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

import { paginatePrescriptions } from "@/app/administrators/(helpers)/_actions/prescriptions"

export default async function Prescriptions({ searchParams }: { searchParams: SearchParams }) {
  const prescriptions = await paginatePrescriptions(searchParams)

  return (
    <div>
      <AdminPageTitle title="Prescriptions">
        <Button icon={Plus} variant="outline">
          Create
        </Button>
      </AdminPageTitle>

      <AdminPrescriptionsTable
        data={prescriptions.prescriptions}
        searchParams={searchParams}
        hasNextPage={prescriptions.hasNextPage}
      />
    </div>
  )
}
