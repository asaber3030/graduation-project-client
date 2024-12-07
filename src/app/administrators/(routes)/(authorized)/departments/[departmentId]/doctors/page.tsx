import AdminPageTitle from "@/app/administrators/(helpers)/_components/common/title"

import { AdminCreateDepartmentModal } from "@/app/administrators/(helpers)/_components/departments/create-modal"
import { SearchParams } from "@/types"
import { Directions } from "@/app/administrators/(helpers)/_components/common/breadcrumb-directions"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

import { paginateDoctorsByDepartment } from "@/app/administrators/(helpers)/_actions/doctors"
import { getDepartmentById } from "@/app/administrators/(helpers)/_actions/departments"
import { adminRoutes } from "@/app/administrators/(helpers)/_utils/routes"
import { notFound } from "next/navigation"

import { AdminDoctorsTable } from "@/app/administrators/(helpers)/_components/doctors/table"

type Props = {
  searchParams: SearchParams
  params: {
    departmentId: string
  }
}

export default async function DepartmentIdDoctors({ searchParams, params }: Props) {
  const departmentId = +params.departmentId
  const department = await getDepartmentById(departmentId)
  const doctors = await paginateDoctorsByDepartment(searchParams, departmentId)

  const breadcrumbs = [
    { href: adminRoutes.departments.root, label: "Departments", disabled: false },
    {
      href: adminRoutes.departments.view(departmentId),
      label: `Department ID: ${departmentId}`,
    },
    {
      href: adminRoutes.departments.departmentDoctors(departmentId),
      label: `Doctors`,
      disabled: true,
    },
  ]

  if (!department) return notFound()

  const pageTitle = (
    <span>
      Department: <strong>{department?.name}</strong> - Doctors
    </span>
  )

  return (
    <div>
      <AdminPageTitle title={pageTitle}>
        <AdminCreateDepartmentModal asChild>
          <Button icon={Plus} variant="outline">
            Create
          </Button>
        </AdminCreateDepartmentModal>
      </AdminPageTitle>

      <Directions urls={breadcrumbs} />

      <AdminDoctorsTable
        searchParams={searchParams}
        hasNextPage={doctors.hasNextPage}
        data={doctors.doctors}
      />
    </div>
  )
}
