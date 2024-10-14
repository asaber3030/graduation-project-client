import React from "react"
import AdminPageTitle from "@/app/administrators/(helpers)/_components/common/title"

import { AdminCreatePrescriptionForm } from "@/app/administrators/(helpers)/_components/prescriptions/create-form"
import { findPrescriptionById } from "@/app/administrators/(helpers)/_actions/prescriptions"
import { notFound } from "next/navigation"
import { AdminUpdatePrescriptionForm } from "@/app/administrators/(helpers)/_components/prescriptions/update-form"
import { ATFullPrescritpion } from "@/app/administrators/(helpers)/_types"

type Props = {
  params: {
    prescriptionId: string
  }
}

export default async function UpdatePrescriptionPage({ params }: Props) {
  const prescriptionId = +params.prescriptionId
  const prescription = (await findPrescriptionById(prescriptionId)) as ATFullPrescritpion

  if (!prescription) return notFound()

  const pageTitle = (
    <span>
      Prescription - <b>#{prescription.id}</b>
    </span>
  )

  return (
    <div>
      <AdminPageTitle title={pageTitle} />
      <AdminUpdatePrescriptionForm prescription={prescription} />
    </div>
  )
}
