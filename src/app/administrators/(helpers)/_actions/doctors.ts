"use server"

import db from "@/services/prisma"

import { createPagination } from "@/lib/utils"
import { SearchParams } from "@/types"
import { currentHospital } from "@/actions/app"

export async function paginateDoctors(searchParams: SearchParams) {
  const hospital = await currentHospital()
  const total = await db.doctor.count({
    where: { hospitalId: hospital.id },
  })
  const pagination = createPagination(searchParams, total)
  const doctors = await db.doctor.findMany({
    where: {
      OR: [
        { name: { contains: searchParams.search ?? "" } },
        { username: { contains: searchParams.search ?? "" } },
      ],
      hospitalId: hospital.id,
    },
    ...pagination.args,
  })

  return {
    doctors,
    ...pagination,
  }
}
