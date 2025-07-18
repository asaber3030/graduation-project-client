"use server"

import bcrypt from "bcrypt"
import db from "@/services/prisma"

import { actionResponse, responseCodes } from "@/lib/api"
import { createPagination } from "@/lib/utils"
import { revalidatePath } from "next/cache"
import { adminRoutes } from "../_utils/routes"
import { currentHospital } from "@/actions/app"
import { getCurrentAdmin } from "./auth"
import { z } from "zod"

import { CreateNotificationEntry } from "../_types"
import { SearchParams } from "@/types"
import { AdminSchema } from "@/schema"
import { Prisma } from "@prisma/client"

export async function findAdmin(record: Prisma.AdminWhereUniqueInput) {
  return await db.admin.findUnique({
    where: record,
  })
}

export async function findAdminByEmail(email: string) {
  return await db.admin.findUnique({
    where: {
      email: email,
    },
  })
}

export async function paginateAdmins(searchParams: SearchParams) {
  const total = await db.admin.count()
  const pagination = createPagination(searchParams, total)
  const admins = await db.admin.findMany({
    ...pagination.args,
  })

  return {
    admins,
    ...pagination,
  }
}

export async function updateAdminAction(id: number, data: z.infer<typeof AdminSchema.update>) {
  if (data.email) {
    const emailExists = await db.admin.findFirst({
      where: { email: data.email, id: { not: id } },
      select: { id: true },
    })
    if (emailExists) return actionResponse(responseCodes.badRequest, "Email already exists")
  }
  if (data.phoneNumber) {
    const phoneExists = await db.admin.findFirst({
      where: { phoneNumber: data.phoneNumber, id: { not: id } },
      select: { id: true },
    })
    if (phoneExists) return actionResponse(responseCodes.badRequest, "Phone Number already exists")
  }

  await db.admin.update({
    where: { id },
    data,
  })
  revalidatePath(adminRoutes.admins.root)
  revalidatePath(adminRoutes.admins.update(id))
  revalidatePath(adminRoutes.admins.view(id))
  return actionResponse(responseCodes.ok, "Admin updated successfully")
}

export async function createAdminAction(data: z.infer<typeof AdminSchema.create>) {
  const hosptial = await currentHospital()

  const emailExists = await findAdmin({ email: data.email })
  if (emailExists) return actionResponse(responseCodes.badRequest, "Email already exists")

  const phoneExists = await findAdmin({ phoneNumber: data.phoneNumber })
  if (phoneExists) return actionResponse(responseCodes.badRequest, "Phone Number already exists")

  const hashedPassword = await bcrypt.hash(data.password, 10)

  await db.admin.create({
    data: {
      ...data,
      hospitalId: hosptial.id,
      password: hashedPassword,
    },
  })

  revalidatePath(adminRoutes.admins.root)
  return actionResponse(responseCodes.ok, "Admin created successfully")
}

export async function deleteAdminAction(id: number) {
  await db.admin.delete({
    where: { id },
  })
  revalidatePath(adminRoutes.admins.root)
  return actionResponse(responseCodes.ok, "Admin deleted successfully")
}

export async function saveAdminLog(action: string, type?: string) {
  const admin = await getCurrentAdmin()
  await db.adminLog.create({
    data: {
      action,
      type,
      adminId: admin.id,
    },
  })
}

export async function notifyAdmin(data: CreateNotificationEntry, adminId?: number) {
  if (!adminId) {
    const admin = await getCurrentAdmin()
    adminId = admin.id
  }
  await db.adminNotification.create({
    data: {
      ...data,
      adminId,
    },
  })
}
