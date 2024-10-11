"use server"

import db from "@/services/prisma"

import { createPagination } from "@/lib/utils"
import { SearchParams } from "@/types"

export async function paginateHospitals(searchParams: SearchParams) {
  const total = await db.hospital.count()
  const pagination = createPagination(searchParams, total)
  const hospitals = await db.hospital.findMany({
    where: {
      OR: [
        { name: { contains: searchParams.search ?? "" } },
        { location: { contains: searchParams.search ?? "" } },
      ],
    },
    ...pagination.args,
  })

  return {
    hospitals,
    ...pagination,
  }
}
