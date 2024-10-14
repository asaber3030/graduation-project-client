"use server"

import db from "@/services/prisma"

import { SearchParams } from "@/types"
import { DepartmentSchema } from "@/schema"

import { createPagination } from "@/lib/utils"
import { currentHospital } from "@/actions/app"
import { revalidatePath } from "next/cache"
import { actionResponse } from "@/lib/api"
import { adminRoutes } from "../_utils/routes"
import { z } from "zod"

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
    include: {
      hospital: true,
    },
    ...pagination.args,
  })

  return {
    departments,
    ...pagination,
  }
}

export async function getDepartmentById(id: number) {
  return db.department.findUnique({
    where: { id },
    include: {
      hospital: true,
    },
  })
}

export async function createDepartmentAction(data: any) {
  const hospital = await currentHospital()
  const findFirstDepartment = await db.department.findFirst({
    where: {
      name: data.name,
      hospitalId: hospital.id,
    },
  })
  if (findFirstDepartment) return actionResponse(404, "Department already exists")

  await db.department.create({
    data: {
      ...data,
      hospitalId: hospital.id,
    },
  })
  revalidatePath(adminRoutes.departments.root)
  return actionResponse(200, "Department created successfully")
}

export async function updateDepartmentAction(
  id: number,
  data: z.infer<typeof DepartmentSchema.update>
) {
  await db.department.update({
    where: { id },
    data,
  })
  revalidatePath(adminRoutes.departments.root)
  revalidatePath(adminRoutes.departments.view(id))
  return actionResponse(200, "Department updated successfully")
}

export async function deleteDepartmentAction(id: number) {
  await db.department.delete({ where: { id } })
  revalidatePath(adminRoutes.departments.root)
  return actionResponse(200, "Department deleted successfully")
}

export async function searchDepartments(search?: string) {
  const departments = await db.department.findMany({
    where: {
      OR: [{ name: { contains: search } }],
      hospitalId: (await currentHospital()).id,
    },
    take: 10,
  })
  return departments
}
