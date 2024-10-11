import React from "react"
import { AdminProvider } from "../../(helpers)/_providers/admin-provider"
import { cookies } from "next/headers"
import { ADMIN_COOKIE_NAME } from "../../(helpers)/_utils/constants"
import { redirect } from "next/navigation"
import { adminRoutes } from "../../(helpers)/_utils/routes"
import { getCurrentAdmin } from "../../(helpers)/_actions/auth"

export default async function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies()
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value

  if (!token) return redirect(adminRoutes.auth.login)
  const admin = await getCurrentAdmin()

  if (!admin) return redirect(adminRoutes.auth.login)

  return <AdminProvider admin={admin}>{children}</AdminProvider>
}
