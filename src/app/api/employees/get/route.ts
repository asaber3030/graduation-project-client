import jwt from "jsonwebtoken"

import { NextRequest } from "next/server"
import { Employee } from "@prisma/client"

import { response } from "@/lib/api"
import { extractToken } from "@/lib/utils"
import { findEmployee } from "@/app/administrators/(helpers)/_actions/employees"

export const revalidate = 0

export async function GET(req: NextRequest) {
  try {
    const authorization = req.headers.get("Authorization")
    if (!authorization) return response(401, "Unauthorized")

    const token = extractToken(authorization) ?? ""
    if (!token) return response(401, "Unauthorized")

    const secret = process.env.EMPLOYEE_SECRET!
    const decodedResult = jwt.verify(token, secret) as Employee

    const employeeWithPassword = await findEmployee({ id: decodedResult.id })
    if (!employeeWithPassword) return response(401, "Unauthorized")

    const { password, ...employee } = employeeWithPassword
    return response(200, "Authorized", { employee })
  } catch (error) {
    return response(401, "Unauthorized", { line: 28 })
  }
}
