import { z } from "zod"
import { GlobalLoginSchema } from "@/schema"

export type SearchParams = {
  search?: string
  orderBy?: string
  orderType?: string
  take?: number
  skipLimit?: boolean
  page?: number
}

export type OrderBy = {
  name: string
  label: string
}

export type APIResponse<T, D> = {
  message: string
  status: number
  data?: T
  error?: D
}

export type LoginProvider = "admins" | "patients" | "employees"
export type GlobalLoginData = {
  data: z.infer<typeof GlobalLoginSchema>
  rememberMe?: boolean
}

export type Languages = "en" | "ar"
