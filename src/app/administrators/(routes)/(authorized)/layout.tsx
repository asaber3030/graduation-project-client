import React from "react"

import { HospitalProvider } from "../../(helpers)/_providers/hospital-provider"
import { AdminProvider } from "../../(helpers)/_providers/admin-provider"
import { AdminSidebar } from "../../(helpers)/_components/common/sidebar/sidebar"
import { AdminNavbar } from "../../(helpers)/_components/common/navbar/navbar"

import { ADMIN_COOKIE_HOSPITAL_ID } from "../../(helpers)/_utils/constants"

import { getCurrentAdmin } from "../../(helpers)/_actions/auth"
import { currentHospital, getCurrentHospital } from "@/actions/app"
import { adminRoutes } from "../../(helpers)/_utils/routes"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export default async function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const admin = await getCurrentAdmin()
  if (!admin) return redirect(adminRoutes.auth.login)

  const hospital = await currentHospital()

  return (
    <AdminProvider admin={admin}>
      <HospitalProvider hospital={hospital}>
        <div className="flex">
          <AdminSidebar />
          <main className="w-full">
            <AdminNavbar />
            <div className="xl:pr-7 py-6 px-4">{children}</div>
          </main>
        </div>
      </HospitalProvider>
    </AdminProvider>
  )
}
