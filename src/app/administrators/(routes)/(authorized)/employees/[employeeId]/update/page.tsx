import React from "react"
import AdminPageTitle from "@/app/administrators/(helpers)/_components/common/title"

import { AdminUpdateEmployeeForm } from "@/app/administrators/(helpers)/_components/employees/update-form"

import { findEmployee } from "@/app/administrators/(helpers)/_actions/employees"
import { notFound } from "next/navigation"
import { Employee } from "@prisma/client"
import { ATFullEmployee } from "@/app/administrators/(helpers)/_types"

type Props = {
  params: {
    employeeId: string
  }
}

export default async function UpdateEmployeePage({ params }: Props) {
  const employeeId = +params.employeeId
  const employee = await findEmployee({ id: employeeId })

  if (!employee) return notFound()

  const pageTitle = (
    <span>
      Update Employee - <b>@{employee.name}</b>
    </span>
  )

  return (
    <div>
      <AdminPageTitle title={pageTitle} />
      <AdminUpdateEmployeeForm employee={employee as ATFullEmployee} />
    </div>
  )
}
