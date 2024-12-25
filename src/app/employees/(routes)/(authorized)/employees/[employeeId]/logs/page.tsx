import AdminPageTitle from "@/app/administrators/(helpers)/_components/common/title"

import db from "@/services/prisma"

import { AdminEmployeeLatestLogsCard } from "@/app/administrators/(helpers)/_components/employees/latest-logs-card"
import { Directions } from "@/app/administrators/(helpers)/_components/common/breadcrumb-directions"
import { LinkBtn } from "@/components/common/link-btn"
import { GoBack } from "@/app/administrators/(helpers)/_components/common/go-back-button"

import { adminRoutes } from "@/app/administrators/(helpers)/_utils/routes"

type Props = {
  params: {
    employeeId: string
  }
}

export default async function EmployeeIdLogs({ params }: Props) {
  const employeeId = +params.employeeId
  const logs = await db.employeeLog.findMany({
    where: { employeeId: employeeId },
    orderBy: { createdAt: "desc" },
  })

  const pageTitle = <span>Logs for Employee ID: {employeeId}</span>

  const breadcrumbs = [
    { href: adminRoutes.employees.root, label: "Employees" },
    {
      href: adminRoutes.employees.view(employeeId),
      label: `Employee ID: ${employeeId}`,
      isBold: true,
    },
    { href: adminRoutes.employees.employeeLogs(employeeId), label: `Logs`, disabled: true },
  ]

  return (
    <div>
      <AdminPageTitle title={pageTitle}>
        <GoBack />
        <LinkBtn href={adminRoutes.employees.view(employeeId)}>View Employee</LinkBtn>
      </AdminPageTitle>

      <Directions urls={breadcrumbs} />
      <div className="mt-4">
        <AdminEmployeeLatestLogsCard logs={logs} />
      </div>
    </div>
  )
}
