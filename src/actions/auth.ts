"use server"

import api from "@/lib/axios"
import z from "zod"

import { GlobalLoginSchema } from "@/schema"
import { APIResponse, LoginProvider } from "@/types"
import { apiURL } from "@/lib/constants"

import { cookies } from "next/headers"
import { ADMIN_COOKIE_NAME } from "@/app/administrators/(helpers)/_utils/constants"

export async function loginAction(
  provider: LoginProvider,
  data: z.infer<typeof GlobalLoginSchema>,
  rememberMe: boolean = false
) {
  const res = await fetch(`${apiURL}/${provider}/login`, {
    method: "POST",
    body: JSON.stringify({ ...data, rememberMe }),
  })
  const json: APIResponse<{ token: string }, any> = await res.json()
  if (json.data?.token) {
    cookies().set(ADMIN_COOKIE_NAME, json?.data.token)
  }

  return json
}
