import AdminPageTitle from "@/app/administrators/(helpers)/_components/common/title"

import { UpdateHospitalForm } from "@/app/administrators/(helpers)/_components/hospitals/update-form"

import { showHospitalName } from "@/lib/utils"
import { getHospital } from "@/actions/app"
import { notFound } from "next/navigation"

type Props = {
  params: { hospitalId: string }
}

export default async function HospitalIdUpdatePage({ params }: Props) {
  const hospitalId = +params.hospitalId
  const hospital = await getHospital({ id: hospitalId })

  if (!hospital) return notFound()

  const pageTitle = (
    <span>
      Update <b>{showHospitalName(hospital)}</b>
    </span>
  )

  return (
    <div>
      <AdminPageTitle title={pageTitle} />
      <UpdateHospitalForm hospital={hospital} />
    </div>
  )
}
