import AdminPageTitle from "@/app/administrators/(helpers)/_components/common/title"
import { AdminCreateEmployeeForm } from "@/app/administrators/(helpers)/_components/employees/create-form"
import React from "react"

export default function CreateEmployeePage() {
  return (
    <div>
      <AdminPageTitle title="Create Employee" />
      <AdminCreateEmployeeForm />
    </div>
  )
}
