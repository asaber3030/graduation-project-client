"use server"

import db from "@/services/prisma"

import { createPagination } from "@/lib/utils"
import { SearchParams } from "@/types"
import { currentHospital } from "@/actions/app"

export async function paginateDepartments(searchParams: SearchParams) {
  const hospital = await currentHospital()
  const total = await db.department.count({
    where: { hospitalId: hospital.id },
  })
  const pagination = createPagination(searchParams, total)
  const departments = await db.department.findMany({
    where: {
      OR: [
        { name: { contains: searchParams.search ?? "" } },
        { hospital: { name: { contains: searchParams.search ?? "" } } },
      ],
      hospitalId: hospital.id,
    },
    ...pagination.args,
  })

  return {
    departments,
    ...pagination,
  }
}
