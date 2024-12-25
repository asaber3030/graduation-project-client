import { Metadata } from "next"

import { redirect } from "next/navigation"
import { employeesRoutes } from "@/app/employees/(helpers)/_utils/employees.routes"
import { EmployeeLoginForm } from "@/app/employees/(helpers)/_components/auth/login-form"
import { getCurrentEmployee } from "@/app/employees/(helpers)/_actions/auth"

export const metadata: Metadata = { title: "Admin Login" }

export default async function EmployeeLoginPage() {
  const employee = await getCurrentEmployee()
  if (employee) return redirect(employeesRoutes.dashboard.root)

  return (
    <div>
      <div className="bg-white border shadow-md max-w-screen-lg mx-auto my-20 p-4 rounded-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login as Employee</h1>
        <EmployeeLoginForm />
      </div>
    </div>
  )
}
