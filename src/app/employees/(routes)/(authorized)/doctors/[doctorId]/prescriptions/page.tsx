import AdminPageTitle from "@/app/administrators/(helpers)/_components/common/title"

import { AdminPrescriptionsTable } from "@/app/administrators/(helpers)/_components/prescriptions/table"
import { SearchParams } from "@/types"
import { LinkBtn } from "@/components/common/link-btn"
import { Plus } from "lucide-react"

import { paginatePrescriptionsByDoctorId } from "@/app/administrators/(helpers)/_actions/prescriptions"
import { adminRoutes } from "@/app/administrators/(helpers)/_utils/routes"
import { findDoctor } from "@/app/administrators/(helpers)/_actions/doctors"
import { notFound } from "next/navigation"

type Props = {
  searchParams: SearchParams
  params: {
    doctorId: string
  }
}

export default async function DoctorIdPrescriptions({ searchParams, params }: Props) {
  const doctorId = +params.doctorId
  const doctor = await findDoctor({ id: doctorId })

  if (!doctor) return notFound()

  const prescriptions = await paginatePrescriptionsByDoctorId(searchParams, doctorId)

  const pageTitle = (
    <span>
      Doctor <b>{doctor.name}</b> - Prescriptions
    </span>
  )

  return (
    <div>
      <AdminPageTitle title={pageTitle}>
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
