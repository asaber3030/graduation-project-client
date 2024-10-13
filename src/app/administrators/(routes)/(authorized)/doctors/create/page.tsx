import AdminPageTitle from "@/app/administrators/(helpers)/_components/common/title"

import { AdminCreateDoctorForm } from "@/app/administrators/(helpers)/_components/doctors/create-form"

export default async function PatientCreatePage() {
  const pageTitle = <span>Create Doctor</span>

  return (
    <div>
      <AdminPageTitle title={pageTitle} />
      <AdminCreateDoctorForm />
    </div>
  )
}
