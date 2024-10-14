"use server"

import db from "@/services/prisma"

import { createPagination } from "@/lib/utils"
import { currentHospital } from "@/actions/app"
import { SearchParams } from "@/types"
import { z } from "zod"
import { InventorySchema } from "@/schema"
import { actionResponse } from "@/lib/api"
import { revalidatePath } from "next/cache"
import { adminRoutes } from "../_utils/routes"

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
    include: { department: true, hospital: true },
    ...pagination.args,
  })

  return {
    inventories,
    ...pagination,
  }
}

export async function searchInventories(search?: string) {
  const inventories = await db.inventory.findMany({
    where: {
      OR: [{ name: { contains: search } }, { code: { contains: search } }],
    },
    take: 10,
  })

  return inventories
}

export async function findInventoryById(id: number) {
  return await db.inventory.findUnique({
    where: { id },
    include: { department: true, hospital: true },
  })
}

export async function createInventoryAction(
  departmentId: number,
  data: z.infer<typeof InventorySchema.create>
) {
  const hospital = await currentHospital()

  const codeExists = await db.inventory.findUnique({
    where: { code: data.code },
  })

  if (codeExists) return actionResponse(409, "Inventory code already exists")

  await db.inventory.create({
    data: {
      ...data,
      departmentId,
      hospitalId: hospital.id,
    },
  })

  revalidatePath(adminRoutes.inventories.root)

  return actionResponse(200, "Inventory created successfully")
}

export async function updateInventoryAction(
  id: number,
  data: z.infer<typeof InventorySchema.update>
) {
  const codeExists = await db.inventory.findUnique({
    where: { code: data.code, AND: [{ id: { not: id } }] },
  })
  if (codeExists) return actionResponse(409, "Inventory code already exists")

  await db.inventory.update({
    where: { id },
    data,
  })

  revalidatePath(adminRoutes.inventories.root)
  revalidatePath(adminRoutes.inventories.view(id))

  return actionResponse(200, "Inventory updated successfully")
}

export async function deleteInventoryAction(id: number) {
  await db.inventory.delete({ where: { id } })
  revalidatePath(adminRoutes.inventories.root)
  return actionResponse(200, "Inventory deleted successfully")
}
