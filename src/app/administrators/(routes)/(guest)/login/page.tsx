import { AdminLoginForm } from "@/app/administrators/(helpers)/_components/auth/login-form"
import { Metadata } from "next"

import { getCurrentAdmin } from "@/app/administrators/(helpers)/_actions/auth"
import { adminRoutes } from "@/app/administrators/(helpers)/_utils/routes"
import { redirect } from "next/navigation"

export const metadata: Metadata = { title: "Admin Login" }

export default async function AdminLoginPage() {
  const admin = await getCurrentAdmin()
  if (admin) return redirect(adminRoutes.dashboard.root)

  return (
    <div>
      <div className="bg-white border shadow-md max-w-screen-lg mx-auto my-20 p-4 rounded-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <AdminLoginForm />
      </div>
    </div>
  )
}
