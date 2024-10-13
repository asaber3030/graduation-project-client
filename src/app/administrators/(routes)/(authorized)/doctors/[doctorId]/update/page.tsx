import { findDoctor } from "@/app/administrators/(helpers)/_actions/doctors"
import AdminPageTitle from "@/app/administrators/(helpers)/_components/common/title"
import { AdminUpdateDoctorForm } from "@/app/administrators/(helpers)/_components/doctors/update-form"
import { adminRoutes } from "@/app/administrators/(helpers)/_utils/routes"
import { LinkBtn } from "@/components/common/link-btn"
import { notFound } from "next/navigation"
import React from "react"

type Props = {
  params: {
    doctorId: string
  }
}

export default async function DoctorIdUpdatePage({ params }: Props) {
  const doctorId = +params.doctorId
  const doctor = await findDoctor({ id: doctorId })

  if (!doctor) return notFound()

  const pageTitle = (
    <span>
      Update Doctor - <b>{doctor.name}</b>
    </span>
  )

  return (
    <div>
      <AdminPageTitle title={pageTitle} />
      <AdminUpdateDoctorForm doctor={doctor} />
    </div>
  )
}
