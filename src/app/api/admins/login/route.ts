import { GlobalLoginSchema } from "@/schema"
import { NextRequest, NextResponse } from "next/server"

import { findAdmin, findAdminByEmail } from "@/app/administrators/(helpers)/_actions/admin"
import { response } from "@/lib/api"
import { extractErrors } from "@/lib/utils"

import env from "@/lib/env"

import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export async function POST(req: NextRequest) {
  const data = await req.json()
  const parsedData = GlobalLoginSchema.safeParse(data)

  if (!parsedData.success) {
    const errors = extractErrors(parsedData.error)
    return response(400, "Validation Error", null, errors)
  }
  const secret = env.ADMIN_SECRET

  const admin = await findAdmin({
    email: parsedData.data.email,
    hospitalId: parsedData.data.hospitalId,
  })
  if (!admin) {
    return response(404, "Admin not found")
  }

  const verifyPassword = await bcrypt.compare(parsedData.data.password, admin.password)
  if (!verifyPassword) {
    return response(401, "Invalid password")
  }

  const { password, ...rest } = admin

  const token = jwt.sign(rest, secret, {
    expiresIn: "30d",
  })

  return response(200, "Login successfully", { token })
}
