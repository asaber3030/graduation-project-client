import React from "react"

import { Metadata } from "next"
import { URLBox } from "@/app/administrators/(helpers)/_components/dashboard/url-box"

import { adminGlobalIcons } from "../../(helpers)/_utils/constants"
import { adminRoutes } from "../../(helpers)/_utils/routes"
import { tableCounts } from "@/app/administrators/(helpers)/_actions/dashboard"

export const metadata: Metadata = {
  title: "Dashboard"
}

export default async function Home() {
  const counts = await tableCounts()

  return (
    <div className="space-y-4">
      <div className="">
        <h1 className="text-3xl font-bold mb-3">Statistics</h1>
        <div className="grid xl:grid-cols-4 grid-cols-1 gap-2">
          <URLBox
            num={counts.patients}
            label="Patients"
            icon={adminGlobalIcons.patients}
            href={adminRoutes.patients.root}
          />
          <URLBox
            num={counts.hospitals}
            label="Hospitals"
            icon={adminGlobalIcons.hospital}
            href={adminRoutes.hospitals.root}
          />
          <URLBox
            num={counts.doctors}
            label="Doctors"
            icon={adminGlobalIcons.doctors}
            href={adminRoutes.doctors.root}
          />
          <URLBox
            num={counts.medicine}
            label="Medicine"
            icon={adminGlobalIcons.medicine}
            href={adminRoutes.medicine.root}
          />
          <URLBox
            num={counts.employees}
            label="Employees"
            icon={adminGlobalIcons.employees}
            href={adminRoutes.employees.root}
          />
          <URLBox
            num={counts.departments}
            label="Departments"
            icon={adminGlobalIcons.departments}
            href={adminRoutes.departments.root}
          />
          <URLBox
            num={counts.inventories}
            label="Inventories"
            icon={adminGlobalIcons.inventories}
            href={adminRoutes.inventories.root}
          />
          <URLBox
            num={counts.prescriptions}
            label="Prescriptions"
            icon={adminGlobalIcons.prescriptions}
            href={adminRoutes.prescriptions.root}
          />
        </div>
      </div>
    </div>
  )
}
