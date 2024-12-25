import AdminPageTitle from "@/app/administrators/(helpers)/_components/common/title"

import { AdminPatientMedicationsTable } from "@/app/administrators/(helpers)/_components/medications/table"
import { PatientResourceTitle } from "@/app/administrators/(helpers)/_components/patients/patient-resource-title"
import { SearchParams } from "@/types"

import { paginateMedications } from "@/app/administrators/(helpers)/_actions/medications"
import { findPatient } from "@/app/administrators/(helpers)/_actions/patients"
import { notFound } from "next/navigation"

type Props = {
  params: {
    patientId: string
  }
  searchParams: SearchParams
}

export default async function PatientIdMedicationsPage({ params, searchParams }: Props) {
  const patientId = +params.patientId
  const patient = await findPatient({ id: patientId })

  if (!patient) return notFound()

  const pageTitle = <PatientResourceTitle patient={patient} resourceName="Medications" />
  const medications = await paginateMedications(searchParams, patientId)

  return (
    <div>
      <AdminPageTitle title={pageTitle}></AdminPageTitle>
      <AdminPatientMedicationsTable
        data={medications.medications}
        hasNextPage={medications.hasNextPage}
        searchParams={searchParams}
      />
    </div>
  )
}
