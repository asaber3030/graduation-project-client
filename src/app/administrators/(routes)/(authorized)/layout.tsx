import React from "react"

import { HospitalProvider } from "../../(helpers)/_providers/hospital-provider"
import { AdminProvider } from "../../(helpers)/_providers/admin-provider"
import { HospitalsSwitcher } from "../../(helpers)/_components/common/hospitals-switcher"

import { ADMIN_COOKIE_HOSPITAL_ID } from "../../(helpers)/_utils/constants"

import { getCurrentAdmin } from "../../(helpers)/_actions/auth"
import { getCurrentHospital } from "@/actions/app"
import { adminRoutes } from "../../(helpers)/_utils/routes"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export default async function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const hospitalIdCookie = Number(cookies().get(ADMIN_COOKIE_HOSPITAL_ID)?.value) ?? 1

  const admin = await getCurrentAdmin()
  if (!admin) return redirect(adminRoutes.auth.login)

  const hospital = await getCurrentHospital(hospitalIdCookie)

  return (
    <div>
      <div>
        <div>{children}</div>
        <div>{JSON.stringify(hospital)}</div>
      </div>
    </div>
  )
}
