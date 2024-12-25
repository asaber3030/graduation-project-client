"use server"

import { EMPLOYEE_COOKIE_NAME } from "../_utils/constants"
import { APIResponse } from "@/types"
import { Employee } from "@prisma/client"

import { getHeaders } from "@/lib/api"
import { cookies } from "next/headers"
import { apiURL } from "@/lib/constants"

type GetAdminResponseType = {
  employee: Employee
}

export async function getCurrentEmployee() {
  try {
    const token = cookies().get(EMPLOYEE_COOKIE_NAME)?.value
    const res = await fetch(`${apiURL}/employees/get`, getHeaders(token))
    const data: APIResponse<GetAdminResponseType, any> = await res.json()
    return data.data?.employee as Employee
  } catch (error) {
    console.log({ error })
  }
}
