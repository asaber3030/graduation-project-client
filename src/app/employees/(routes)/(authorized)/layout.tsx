import React from "react"

import { HospitalProvider } from "../../(helpers)/_providers/hospital-provider"

import { currentHospital } from "@/actions/app"
import { redirect } from "next/navigation"
import { getCurrentEmployee } from "../../(helpers)/_actions/auth"
import { EmployeeSidebar } from "../../(helpers)/_components/common/sidebar/sidebar"
import { EmployeeNavbar } from "../../(helpers)/_components/common/navbar/navbar"
import { EmployeeProvider } from "../../(helpers)/_providers/employee-provider"
import { employeesRoutes } from "../../(helpers)/_utils/employees.routes"
import { EmployeePermissionsProvider } from "../../(helpers)/_providers/permissions-provider"
import { getCurrentEmployeePermissions } from "@/app/administrators/(helpers)/_actions/employees"
import db from "@/services/prisma"

export default async function EmployeeRootLayout({ children }: { children: React.ReactNode }) {
  const employee = await getCurrentEmployee()
  if (!employee) return redirect(employeesRoutes.auth.login)

  const permissions = await db.resourcePermissionGroup.findMany({
    where: {
      permissions: {
        some: {
          employeePermission: {
            some: { employeeId: employee.id }
          }
        }
      }
    },
    include: {
      permissions: {
        include: {
          employeePermission: {
            where: { employeeId: employee.id }
          }
        }
      }
    }
  })
  const hospital = await currentHospital()

  console.dir(permissions, { depth: null })

  return (
    <EmployeeProvider employee={employee}>
      <EmployeePermissionsProvider permissions={permissions}>
        <HospitalProvider hospital={hospital}>
          <div className="flex">
            <EmployeeSidebar />
            <main className="w-full">
              <EmployeeNavbar />
              <div className="xl:pr-7 py-6 px-4">{children}</div>
            </main>
          </div>
        </HospitalProvider>
      </EmployeePermissionsProvider>
    </EmployeeProvider>
  )
}
