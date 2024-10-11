"use server"

import db from "@/services/prisma"

import { createPagination } from "@/lib/utils"
import { SearchParams } from "@/types"

export async function paginatePatients(searchParams: SearchParams) {
  const total = await db.patient.count()
  const pagination = createPagination(searchParams, total)
  const patients = await db.patient.findMany({
    where: {
      OR: [{ name: { contains: searchParams.search ?? "" } }],
    },
    ...pagination.args,
  })

  return {
    patients,
    ...pagination,
  }
}
