import AdminPageTitle from "@/app/administrators/(helpers)/_components/common/title"

import { CreatePatientForm } from "@/app/administrators/(helpers)/_components/patients/create-form"

export default async function PatientCreatePage() {
  const pageTitle = <span>Create Patient</span>

  return (
    <div>
      <AdminPageTitle title={pageTitle} />
      <CreatePatientForm />
    </div>
  )
}
