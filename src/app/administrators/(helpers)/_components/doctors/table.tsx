import Link from "next/link"
import FilterAll from "@/app/administrators/(helpers)/_components/common/filter"

import Image from "next/image"

import { SearchParams } from "@/types"
import { DefaultTableFooter } from "@/app/administrators/(helpers)/_components/common/table-footer"
import { OrderBy } from "../../_utils/order-by"
import { EmptyState } from "@/components/common/empty-state"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { diffForHuman } from "@/lib/utils"
import { userImagePlaceholder } from "@/lib/constants"

import { AdminDoctorActionsDropdown } from "./doctor-actions-dropdown"
import { ATFullDoctor } from "../../_types"
import { adminRoutes } from "../../_utils/routes"
import { LinkBtn } from "@/components/common/link-btn"
import { DeleteModal } from "../common/delete-modal"
import { Button } from "@/components/ui/button"
import { deleteDoctorAction } from "../../_actions/doctors"
import { Trash } from "lucide-react"

type Props = {
  data: ATFullDoctor[]
  searchParams: SearchParams
  hasNextPage: boolean
  showFilters?: boolean
}

export const AdminDoctorsTable = ({
  showFilters = true,
  hasNextPage,
  searchParams,
  data,
}: Props) => {
  return (
    <>
      {showFilters && (
        <FilterAll
          searchParams={searchParams}
          orderByArray={OrderBy.departments}
          parentClassName="mb-4"
        />
      )}
      {data.length === 0 ? (
        <EmptyState />
      ) : (
        <section>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Profile</TableHead>
                <TableHead>Last Update</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((doctor) => (
                <TableRow key={`doctor-row-${doctor.id}`}>
                  <TableCell className="font-medium">{doctor.id}</TableCell>

                  <TableCell>{doctor.name}</TableCell>

                  <TableCell>{doctor.department.name}</TableCell>

                  <TableCell>{doctor.jobTitle}</TableCell>

                  <TableCell>
                    <Link className="text-blue-600" href={adminRoutes.doctors.view(doctor.id)}>
                      @{doctor.username}
                    </Link>
                  </TableCell>

                  <TableCell>
                    <Image src={userImagePlaceholder} width={40} height={40} alt="Doctor Logo" />
                  </TableCell>

                  <TableCell>{diffForHuman(doctor.updatedAt)}</TableCell>

                  <TableCell className="text-right space-x-2">
                    <LinkBtn href={adminRoutes.doctors.update(doctor.id)} variant="blue">
                      Update
                    </LinkBtn>
                    <DeleteModal deletedId={doctor.id} forceAction={deleteDoctorAction}>
                      <Button variant="destructive" icon={Trash}>
                        Delete
                      </Button>
                    </DeleteModal>
                    <AdminDoctorActionsDropdown doctor={doctor} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <DefaultTableFooter searchParams={searchParams} hasNextPage={!hasNextPage} />
        </section>
      )}
    </>
  )
}
