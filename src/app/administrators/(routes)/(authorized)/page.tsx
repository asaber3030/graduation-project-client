import React from "react"
import { URLBox } from "../../(helpers)/_components/dashboard/url-box"
import { Plus, Users } from "lucide-react"
import { adminRoutes } from "../../(helpers)/_utils/routes"
import { Metadata } from "next"
import { URLShortcut } from "../../(helpers)/_components/dashboard/url-shortcut"
import { adminGlobalIcons } from "../../(helpers)/_utils/constants"

export const metadata: Metadata = {
  title: "Dashboard",
}

export default async function Home() {
  return (
    <div className="space-y-4">
      <div className="">
        <h1 className="text-3xl font-bold mb-3">Statistics</h1>
        <div className="grid xl:grid-cols-4 grid-cols-1 gap-2">
          <URLBox
            num={20}
            label="Patients"
            icon={adminGlobalIcons.patients}
            href={adminRoutes.patients.root}
          />
          <URLBox
            num={20}
            label="Hospitals"
            icon={adminGlobalIcons.hospital}
            href={adminRoutes.hospitals.root}
          />
          <URLBox
            num={20}
            label="Doctors"
            icon={adminGlobalIcons.doctors}
            href={adminRoutes.doctors.root}
          />
          <URLBox
            num={20}
            label="Medicine"
            icon={adminGlobalIcons.medicine}
            href={adminRoutes.medicine.root}
          />
          <URLBox
            num={20}
            label="Employees"
            icon={adminGlobalIcons.employees}
            href={adminRoutes.employees.root}
          />
          <URLBox
            num={20}
            label="Departments"
            icon={adminGlobalIcons.departments}
            href={adminRoutes.departments.root}
          />
          <URLBox
            num={20}
            label="Inventories"
            icon={adminGlobalIcons.inventories}
            href={adminRoutes.inventories.root}
          />
          <URLBox
            num={20}
            label="Prescriptions"
            icon={adminGlobalIcons.prescriptions}
            href={adminRoutes.prescriptions.root}
          />
        </div>
      </div>

      <div className="">
        <h1 className="text-3xl font-bold mb-3">Shortcuts</h1>
        <div className="grid xl:grid-cols-6 grid-cols-1 gap-2">
          <URLShortcut label="Create Doctor" icon={Plus} href={adminRoutes.doctors.root} />
          <URLShortcut label="Patients" icon={Users} href={adminRoutes.doctors.root} />
          <URLShortcut label="Patients" icon={Users} href={adminRoutes.doctors.root} />
          <URLShortcut label="Patients" icon={Users} href={adminRoutes.doctors.root} />
          <URLShortcut label="Patients" icon={Users} href={adminRoutes.doctors.root} />
          <URLShortcut label="Patients" icon={Users} href={adminRoutes.doctors.root} />
          <URLShortcut label="Patients" icon={Users} href={adminRoutes.doctors.root} />
          <URLShortcut label="Patients" icon={Users} href={adminRoutes.doctors.root} />
          <URLShortcut label="Patients" icon={Users} href={adminRoutes.doctors.root} />
          <URLShortcut label="Patients" icon={Users} href={adminRoutes.doctors.root} />
          <URLShortcut label="Patients" icon={Users} href={adminRoutes.doctors.root} />
          <URLShortcut label="Patients" icon={Users} href={adminRoutes.doctors.root} />
          <URLShortcut label="Patients" icon={Users} href={adminRoutes.doctors.root} />
          <URLShortcut label="Patients" icon={Users} href={adminRoutes.doctors.root} />
          <URLShortcut label="Patients" icon={Users} href={adminRoutes.doctors.root} />
          <URLShortcut label="Patients" icon={Users} href={adminRoutes.doctors.root} />
          <URLShortcut label="Patients" icon={Users} href={adminRoutes.doctors.root} />
          <URLShortcut label="Patients" icon={Users} href={adminRoutes.doctors.root} />
          <URLShortcut label="Patients" icon={Users} href={adminRoutes.doctors.root} />
          <URLShortcut label="Patients" icon={Users} href={adminRoutes.doctors.root} />
        </div>
      </div>
    </div>
  )
}
