import AdminEmployeeWorkInformationCard from "@/app/administrators/(helpers)/_components/employees/work-information-card"
import AdminPageTitle from "@/app/administrators/(helpers)/_components/common/title"
import React from "react"
import Link from "next/link"

import db from "@/services/prisma"

import { AdminEmployeeLatestLogsCard } from "@/app/administrators/(helpers)/_components/employees/latest-logs-card"
import { AdminEmployeeDetailsCard } from "@/app/administrators/(helpers)/_components/employees/details-card"
import { EmployeeResourceBox } from "@/app/administrators/(helpers)/_components/employees/resource-box"
import { ATFullEmployee } from "@/app/administrators/(helpers)/_types"
import { Directions } from "@/app/administrators/(helpers)/_components/common/breadcrumb-directions"
import { LinkBtn } from "@/components/common/link-btn"
import { Button } from "@/components/ui/button"

import { resourcesIcons } from "@/lib/constants"
import { findEmployee } from "@/app/administrators/(helpers)/_actions/employees"
import { adminRoutes } from "@/app/administrators/(helpers)/_utils/routes"
import { notFound } from "next/navigation"

type Props = {
  params: {
    employeeId: string
  }
}

export default async function EmployeeIdPage({ params }: Props) {
  const employeeId = +params.employeeId
  const employee = await findEmployee({ id: employeeId })
  const countLogs = await db.employeeLog.count({ where: { employeeId } })
  const countPermissions = await db.employeePermission.count({ where: { employeeId } })

  if (!employee) return notFound()

  const logs = await db.employeeLog.findMany({
    where: { employeeId: employee.id },
    orderBy: { createdAt: "desc" },
    take: 5,
  })

  const pageTitle = (
    <span>
      Employee <b>{employee.name}</b>
    </span>
  )

  const breadcrumbs = [
    { href: adminRoutes.employees.root, label: "Employees" },
    {
      href: adminRoutes.employees.view(employeeId),
      label: `Employee ID: ${employeeId}`,
      disabled: true,
    },
  ]

  return (
    <div>
      <AdminPageTitle title={pageTitle}>
        <LinkBtn href={adminRoutes.employees.update(employee.id)}>Update</LinkBtn>
      </AdminPageTitle>

      <Directions urls={breadcrumbs} />

      <section className="mt-4">
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <EmployeeResourceBox
            num={countPermissions}
            label="Permissions"
            href={adminRoutes.employees.employeePermissions(employee.id)}
            image={resourcesIcons.permissions}
          />
          <EmployeeResourceBox
            num={countLogs}
            label="Logs"
            href={adminRoutes.employees.employeeLogs(employee.id)}
            image={resourcesIcons.logs}
          />
        </section>

        <div className="grid gap-4 md:grid-cols-2 my-4">
          <AdminEmployeeDetailsCard employee={employee as ATFullEmployee} />
          <AdminEmployeeWorkInformationCard employee={employee as ATFullEmployee} />
        </div>

        <Link
          className="text-xl font-semibold my-4 block w-fit hover:underline"
          href={adminRoutes.employees.employeeLogs(employeeId)}
        >
          Latest Logs
        </Link>

        <AdminEmployeeLatestLogsCard logs={logs} />
        <div className="mt-4 flex justify-end gap-2">
          <LinkBtn href={adminRoutes.employees.update(employee.id)} variant="outline">
            Edit Employee
          </LinkBtn>
          <Button>Download Report</Button>
        </div>
      </section>
    </div>
  )
}
