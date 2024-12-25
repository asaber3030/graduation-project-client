import db from "@/services/prisma"

import AdminPageTitle from "@/app/administrators/(helpers)/_components/common/title"
import React from "react"

import { findMedicine } from "@/app/administrators/(helpers)/_actions/medicine"
import { notFound } from "next/navigation"

import { AdminUpdateMedicineForm } from "@/app/administrators/(helpers)/_components/medicine/update-form"

type Props = {
  params: {
    medicineId: string
  }
}

export default async function UpdateMedicinePage({ params }: Props) {
  const medicineId = +params.medicineId
  const medicine = await findMedicine({ id: medicineId })
  const dosageForms = await db.dosageForm.findMany()

  if (!medicine) return notFound()

  const pageTitle = (
    <span>
      Update Medicine -{" "}
      <b>
        {medicine.enName} # {medicine.id}
      </b>
    </span>
  )

  return (
    <div>
      <AdminPageTitle title={pageTitle} />
      <AdminUpdateMedicineForm medicine={medicine} dosageForms={dosageForms} />
    </div>
  )
}
