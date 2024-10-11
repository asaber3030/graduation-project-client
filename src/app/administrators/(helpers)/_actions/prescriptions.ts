"use server"

import db from "@/services/prisma"

import { createPagination } from "@/lib/utils"
import { SearchParams } from "@/types"
import { currentHospital } from "@/actions/app"

export async function paginatePrescriptions(searchParams: SearchParams) {
  const hospital = await currentHospital()
  const total = await db.prescription.count({
    where: { hospitalId: hospital.id },
  })
  const pagination = createPagination(searchParams, total)
  const prescriptions = await db.prescription.findMany({
    where: {
      OR: [{ patient: { name: { contains: searchParams.search ?? "" } } }],
      hospitalId: hospital.id,
    },
    include: {
      patient: true,
      doctor: true,
    },
    ...pagination.args,
  })

  return {
    prescriptions,
    ...pagination,
  }
}
