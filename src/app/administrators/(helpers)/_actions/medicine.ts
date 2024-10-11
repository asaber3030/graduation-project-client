"use server"

import db from "@/services/prisma"

import { createPagination } from "@/lib/utils"
import { currentHospital } from "@/actions/app"
import { SearchParams } from "@/types"

export async function paginateMedicine(searchParams: SearchParams) {
  const hospital = await currentHospital()
  const total = await db.medicine.count({
    where: { hospitalId: hospital.id },
  })
  const pagination = createPagination(searchParams, total)
  const medicine = await db.medicine.findMany({
    where: {
      OR: [
        { enName: { contains: searchParams.search ?? "" } },
        { arName: { contains: searchParams.search ?? "" } },
      ],
      hospitalId: hospital.id,
    },
    include: { dosageForm: true },
    ...pagination.args,
  })

  return {
    medicine,
    ...pagination,
  }
}
