"use server"

import { ADMIN_COOKIE_NAME } from "../_utils/constants"

import { APIResponse } from "@/types"
import { Admin } from "@prisma/client"

import { getHeaders } from "@/lib/api"
import { cookies } from "next/headers"
import { apiURL } from "@/lib/constants"

type GetAdminResponseType = {
  admin: Admin
}

export async function getCurrentAdmin() {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value
  const res = await fetch(`${apiURL}/admins/get`, getHeaders(token))
  const data: APIResponse<GetAdminResponseType, any> = await res.json()
  return data.data?.admin as Admin
}
