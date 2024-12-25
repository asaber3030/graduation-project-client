import AdminPageTitle from "@/app/administrators/(helpers)/_components/common/title"
import db from "@/services/prisma"

import { AdminCreateMedicineForm } from "@/app/administrators/(helpers)/_components/medicine/create-form"
import { getHospitals } from "@/actions/app"

export default async function CreateMedicinePage() {
  const hospitals = await getHospitals()
  const dosageForms = await db.dosageForm.findMany()

  return (
    <div>
      <AdminPageTitle title="Create Medicine" />
      <AdminCreateMedicineForm dosageForms={dosageForms} hospitals={hospitals} />
    </div>
  )
}
