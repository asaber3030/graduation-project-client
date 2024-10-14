"use server"

import db from "@/services/prisma"
import bcrypt from "bcrypt"

import { Employee, Prisma } from "@prisma/client"
import { EmployeeSchema } from "@/schema"
import { SearchParams } from "@/types"

import { actionResponse, responseCodes } from "@/lib/api"
import { createPagination } from "@/lib/utils"
import { currentHospital } from "@/actions/app"
import { revalidatePath } from "next/cache"
import { adminRoutes } from "../_utils/routes"
import { z } from "zod"

export async function findEmployee(record: Prisma.EmployeeWhereUniqueInput) {
  const employee = await db.employee.findUnique({
    where: record,
    include: { hospital: true, department: true },
  })
  if (!employee) return null
  const { password, ...rest } = employee
  return rest
}

export async function findFirstEmployee(record: Prisma.EmployeeFindFirstArgs) {
  const employee = await db.employee.findFirst(record)
  if (!employee) return null
  const { password, ...rest } = employee
  return rest as Employee
}

export async function paginateEmployees(searchParams: SearchParams) {
  const total = await db.employee.count()
  const pagination = createPagination(searchParams, total)
  const employees = await db.employee.findMany({
    where: {
      OR: [{ name: { contains: searchParams.search ?? "" } }],
    },
    include: {
      department: true,
      hospital: true,
    },
    ...pagination.args,
  })

  return {
    employees,
    ...pagination,
  }
}

export async function updateEmployeeAction(
  id: number,
  departmentId: number,
  data: z.infer<typeof EmployeeSchema.update>
) {
  if (data.email) {
    const emailExists = await findFirstEmployee({
      where: {
        email: data.email,
        id: { not: id },
      },
    })
    if (emailExists) return actionResponse(responseCodes.badRequest, "Email already exists")
  }

  if (data.phoneNumber) {
    const phoneExists = await findFirstEmployee({
      where: {
        phoneNumber: data.phoneNumber,
        id: { not: id },
      },
    })
    if (phoneExists) return actionResponse(responseCodes.badRequest, "Phone Number already exists")
  }

  if (data.username) {
    const usernameExists = await findFirstEmployee({
      where: {
        username: data.username,
        id: { not: id },
      },
    })
    if (usernameExists) return actionResponse(responseCodes.badRequest, "Username already exists")
  }

  await db.employee.update({
    where: { id },
    data: {
      ...data,
      departmentId,
    },
  })

  revalidatePath(adminRoutes.employees.root)
  revalidatePath(adminRoutes.employees.update(id))
  return actionResponse(responseCodes.ok, "Employee updated successfully")
}

export async function createEmployeeAction(
  departmentId: number,
  data: z.infer<typeof EmployeeSchema.create>
) {
  const hospital = await currentHospital()

  const emailExists = await findEmployee({ email: data.email })
  if (emailExists) return actionResponse(responseCodes.badRequest, "Email already exists")

  const phoneExists = await findEmployee({ phoneNumber: data.phoneNumber })
  if (phoneExists) return actionResponse(responseCodes.badRequest, "Phone Number already exists")

  const hashedPassword = await bcrypt.hash(data.password, 10)

  await db.employee.create({
    data: {
      ...data,
      departmentId,
      hospitalId: hospital.id,
      password: hashedPassword,
    },
  })

  revalidatePath(adminRoutes.employees.root)
  return actionResponse(responseCodes.ok, "Employee created successfully")
}

export async function deleteEmployeeAction(id: number) {
  try {
    const deletedEmployee = await db.employee.delete({
      where: { id },
    })
    return actionResponse(200, "Employee has been deleted.")
  } catch (error) {
    return actionResponse(400, "Failed to delete.")
  }
}
