"use server"

import z from "zod"

import { GlobalLoginSchema } from "@/schema"
import { APIResponse, LoginProvider } from "@/types"
import { ADMIN_COOKIE_NAME } from "@/app/administrators/(helpers)/_utils/constants"

import { apiURL } from "@/lib/constants"
import { cookies } from "next/headers"
import { EMPLOYEE_COOKIE_NAME } from "@/app/employees/(helpers)/_utils/constants"

export async function loginAction(
  provider: LoginProvider,
  data: z.infer<typeof GlobalLoginSchema>,
  rememberMe: boolean = false
) {
  const res = await fetch(`${apiURL}/${provider}/login`, {
    method: "POST",
    body: JSON.stringify({ ...data, rememberMe })
  })

  let cookie = ""

  switch (provider) {
    case "employees":
      cookie = EMPLOYEE_COOKIE_NAME
      break
    case "admins":
      cookie = ADMIN_COOKIE_NAME
      break
  }

  const json: APIResponse<{ token: string }, any> = await res.json()
  if (json.data?.token) {
    cookies().set(cookie, json?.data.token, {
      expires: Date.now() + 24 * 60 * 60 * 1000 * 30
    })
  }

  return json
}
