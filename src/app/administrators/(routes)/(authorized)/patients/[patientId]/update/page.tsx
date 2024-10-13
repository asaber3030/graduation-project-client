import AdminPageTitle from "@/app/administrators/(helpers)/_components/common/title"

import { UpdatePatientForm } from "@/app/administrators/(helpers)/_components/patients/update-form"

import { findPatient } from "@/app/administrators/(helpers)/_actions/patients"
import { notFound } from "next/navigation"

type Props = {
  params: { patientId: string }
}

export default async function PatientIdUpdatePage({ params }: Props) {
  const patientId = +params.patientId
  const patient = await findPatient({ id: patientId })

  if (!patient) return notFound()

  const pageTitle = (
    <span className="flex gap-2 items-center">
      Update Patient
      <b>
        {patient.name} # {patient.nationalId}
      </b>
    </span>
  )

  return (
    <div>
      <AdminPageTitle title={pageTitle} />
      <UpdatePatientForm patient={patient} />
    </div>
  )
}
