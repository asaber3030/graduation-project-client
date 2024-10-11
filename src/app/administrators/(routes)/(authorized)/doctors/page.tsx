import AdminPageTitle from "@/app/administrators/(helpers)/_components/common/title"
import FilterAll from "@/app/administrators/(helpers)/_components/common/filter"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Cog, Plus, Trash } from "lucide-react"
import { SearchParams } from "@/types"
import { DefaultTableFooter } from "@/app/administrators/(helpers)/_components/common/table-footer"
import { paginateHospitals } from "@/app/administrators/(helpers)/_actions/hospitals"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { diffForHuman } from "@/lib/utils"
import { HospitalActionsDropdown } from "@/app/administrators/(helpers)/_components/hospitals/hospital-actions-dropdown"
import { EmptyState } from "@/components/common/empty-state"
import { paginateDoctors } from "@/app/administrators/(helpers)/_actions/doctors"
import { userImagePlaceholder } from "@/lib/constants"
import Link from "next/link"
import { DoctorActionsDropdown } from "@/app/administrators/(helpers)/_components/doctors/doctor-actions-dropdown"

export default async function Doctors({ searchParams }: { searchParams: SearchParams }) {
  const doctors = await paginateDoctors(searchParams)

  return (
    <div>
      <AdminPageTitle title="Doctors">
        <Button icon={Plus} variant="outline">
          Create
        </Button>
      </AdminPageTitle>

      <FilterAll
        searchParams={searchParams}
        orderByArray={[{ label: "Name", name: "name" }]}
        parentClassName="mb-4"
      />
      {doctors.doctors.length === 0 ? (
        <EmptyState />
      ) : (
        <section>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Profile</TableHead>
                <TableHead>Last Update</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doctors.doctors.map((doctor) => (
                <TableRow key={`doctor-row-${doctor.id}`}>
                  <TableCell className="font-medium">{doctor.id}</TableCell>
                  <TableCell>{doctor.name}</TableCell>
                  <TableCell>{doctor.jobTitle}</TableCell>
                  <TableCell>
                    <Link href={""}>@{doctor.username}</Link>
                  </TableCell>
                  <TableCell>
                    <Image src={userImagePlaceholder} width={40} height={40} alt="doctor Logo" />
                  </TableCell>
                  <TableCell>{diffForHuman(doctor.updatedAt)}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <DoctorActionsDropdown doctor={doctor} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <DefaultTableFooter searchParams={searchParams} hasNextPage={!doctors.hasNextPage} />
        </section>
      )}
    </div>
  )
}
