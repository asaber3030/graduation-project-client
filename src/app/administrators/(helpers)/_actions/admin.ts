"use server"

import db from "@/services/prisma"
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
