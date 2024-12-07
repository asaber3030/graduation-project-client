import AdminPageTitle from "@/app/administrators/(helpers)/_components/common/title"
import React from "react"

import { AdminUpdateEmployeeForm } from "@/app/administrators/(helpers)/_components/employees/update-form"
import { ATFullEmployee } from "@/app/administrators/(helpers)/_types"
import { Directions } from "@/app/administrators/(helpers)/_components/common/breadcrumb-directions"

import { findEmployee } from "@/app/administrators/(helpers)/_actions/employees"
import { adminRoutes } from "@/app/administrators/(helpers)/_utils/routes"
import { notFound } from "next/navigation"

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

  const breadcrumbs = [
    { href: adminRoutes.employees.root, label: "Employees" },
    {
      href: adminRoutes.employees.view(employeeId),
      label: `Employee ID: ${employeeId}`,
      isBold: true,
    },
    {
      href: adminRoutes.employees.update(employeeId),
      label: `Update`,
      disabled: true,
    },
  ]

  return (
    <div>
      <AdminPageTitle title={pageTitle} />
      <Directions urls={breadcrumbs} />
      <AdminUpdateEmployeeForm employee={employee as ATFullEmployee} />
    </div>
  )
}
