"use server"

import db from "@/services/prisma"

import { createPagination } from "@/lib/utils"
import { SearchParams } from "@/types"

export async function paginateEmployees(searchParams: SearchParams) {
  const total = await db.employee.count()
  const pagination = createPagination(searchParams, total)
  const employees = await db.employee.findMany({
    where: {
      OR: [{ name: { contains: searchParams.search ?? "" } }],
    },
    ...pagination.args,
  })

  return {
    employees,
    ...pagination,
  }
}
