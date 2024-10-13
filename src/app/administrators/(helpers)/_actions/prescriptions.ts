"use server"

import db from "@/services/prisma"

import { createPagination } from "@/lib/utils"
import { SearchParams } from "@/types"
import { currentHospital } from "@/actions/app"
import { Prisma } from "@prisma/client"
import { PrescriptionItemSchema } from "@/schema"
import { actionResponse } from "@/lib/api"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { adminRoutes } from "../_utils/routes"

export async function paginatePrescriptions(searchParams: SearchParams, patientId?: number) {
  const hospital = await currentHospital()
  const where: Prisma.PrescriptionWhereInput = {
    hospitalId: hospital.id,
  }
  if (patientId) {
    where.patientId = patientId
  }
  const total = await db.prescription.count({
    where,
  })
  const pagination = createPagination(searchParams, total)

  where.OR = [{ patient: { name: { contains: searchParams.search ?? "" } } }]

  const prescriptions = await db.prescription.findMany({
    where,
    include: {
      patient: true,
      doctor: true,
      _count: {
        select: { items: true },
      },
    },
    ...pagination.args,
  })

  return {
    prescriptions,
    ...pagination,
  }
}

export async function countPrescriptionsByPatientId(patientId: number) {
  return db.prescription.count({
    where: { patientId },
  })
}

export async function findPrescriptionById(id: number) {
  return db.prescription.findUnique({
    where: { id },
    include: {
      patient: true,
      hospital: true,
      doctor: true,
    },
  })
}

export async function findPrescriptionMedications(id: number) {
  return db.prescriptionItem.findMany({
    where: { prescriptionId: id },
    include: {
      medicine: true,
    },
  })
}

export async function createPrescriptionItemAction(
  medicineId: number,
  prescriptionId: number,
  data: z.infer<typeof PrescriptionItemSchema.create>
) {
  if (!medicineId) return actionResponse(404, "Medicine not found")
  if (!prescriptionId) return actionResponse(404, "Medicine not found")

  await db.prescriptionItem.create({
    data: {
      ...data,
      medicineId,
      prescriptionId,
    },
  })

  revalidatePath(adminRoutes.prescriptions.view(prescriptionId))

  return actionResponse(200, "Prescription item created")
}

export async function updatePrescriptionItemAction(
  itemId: number,
  medicineId: number,
  data: z.infer<typeof PrescriptionItemSchema.update>
) {
  const item = await findPrescriptionItem(itemId)
  if (!item) return actionResponse(404, "Prescription item not found")

  let medicineIdNumber = item.medicineId

  if (medicineId) medicineIdNumber = medicineId

  await db.prescriptionItem.update({
    where: { id: itemId },
    data: {
      ...data,
      medicineId: medicineIdNumber,
    },
  })
  revalidatePath(adminRoutes.prescriptions.view(item?.prescriptionId))
  return actionResponse(200, "Prescription item updated")
}

export async function deletePrescriptionItemAction(itemId: number) {
  const item = await findPrescriptionItem(itemId)
  if (!item) return actionResponse(404, "Prescription item not found")

  await db.prescriptionItem.delete({
    where: { id: itemId },
  })
  revalidatePath(adminRoutes.prescriptions.view(item.prescriptionId))
  return actionResponse(200, "Prescription item deleted")
}

export async function findPrescriptionItem(itemId: number) {
  return db.prescriptionItem.findUnique({
    where: { id: itemId },
  })
}
