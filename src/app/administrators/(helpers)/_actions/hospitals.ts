"use server"

import db from "@/services/prisma"

import { createPagination } from "@/lib/utils"
import { SearchParams } from "@/types"

import z from "zod"
import { HospitalSchema } from "@/schema"
import { actionResponse, responseCodes } from "@/lib/api"
import { revalidatePath } from "next/cache"
import { adminRoutes } from "../_utils/routes"

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

export async function updateHospitalAction(
  id: number,
  data: z.infer<typeof HospitalSchema.update>
) {
  await db.hospital.update({
    where: { id },
    data,
  })
  revalidatePath(adminRoutes.hospitals.root)
  revalidatePath(adminRoutes.hospitals.update(id))
  revalidatePath(adminRoutes.hospitals.view(id))
  return actionResponse(responseCodes.ok, "Hospital updated successfully")
}
