"use server"

import { ADMIN_COOKIE_HOSPITAL_ID } from "@/app/administrators/(helpers)/_utils/constants"
import db from "@/services/prisma"
import { Hospital, Prisma } from "@prisma/client"
import { cookies } from "next/headers"

export async function getHospitals() {
  const hospitals = await db.hospital.findMany({ orderBy: { id: "desc" } })
  return hospitals
}

export async function getHospital(record: Prisma.HospitalWhereUniqueInput) {
  const hospital = await db.hospital.findUnique({ where: record })
  return hospital
}

export async function getCurrentHospital(id: number): Promise<Hospital> {
  const hospital = await db.hospital.findUnique({ where: { id } })
  if (!hospital) return (await db.hospital.findUnique({ where: { id: 1 } })) as Hospital
  return hospital
}

export async function currentHospital(): Promise<Hospital> {
  const hospitalId = Number(cookies().get(ADMIN_COOKIE_HOSPITAL_ID)?.value ?? 1) ?? 1
  const currentHospital = await getCurrentHospital(hospitalId)
  return currentHospital
}
