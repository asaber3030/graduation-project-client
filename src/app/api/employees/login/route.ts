import { GlobalLoginSchema } from "@/schema"
import { NextRequest, NextResponse } from "next/server"

import { response, responseCodes } from "@/lib/api"
import { extractErrors } from "@/lib/utils"
import { findEmployee } from "@/app/administrators/(helpers)/_actions/employees"

import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const revalidate = 0

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json()
  const parsedData = GlobalLoginSchema.safeParse(body)

  if (!parsedData.success)
    return response(responseCodes.serverError, "Validation errors", {
      errors: extractErrors(parsedData.error)
    })

  const employee = await findEmployee({
    email: parsedData.data.email,
    hospitalId: parsedData.data.hospitalId
  })
  if (!employee) return response(responseCodes.notFound, "Employee doesn't exist.")

  const comparePassword = await bcrypt.compare(parsedData.data.password, employee.password)
  if (!comparePassword) return response(responseCodes.notFound, "Invalid password.")

  const { password, ...rest } = employee

  const token = jwt.sign(rest, process.env.EMPLOYEE_SECRET!, {
    expiresIn: "30d"
  })

  return response(responseCodes.ok, "Loggedin as Employee Successfully", { token })
}
