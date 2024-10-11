"use server"

import db from "@/services/prisma"

import { createPagination } from "@/lib/utils"
import { currentHospital } from "@/actions/app"
import { SearchParams } from "@/types"

export async function paginateInventories(searchParams: SearchParams) {
  const hospital = await currentHospital()
  const total = await db.inventory.count({
    where: { hospitalId: hospital.id },
  })
  const pagination = createPagination(searchParams, total)
  const inventories = await db.inventory.findMany({
    where: {
      OR: [
        { name: { contains: searchParams.search ?? "" } },
        { code: { contains: searchParams.search ?? "" } },
      ],
      hospitalId: hospital.id,
    },
    include: { department: true },
    ...pagination.args,
  })

  return {
    inventories,
    ...pagination,
  }
}
