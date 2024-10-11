"use client"

import { Admin } from "@prisma/client"
import { createContext } from "react"

export const AdminContext = createContext<Admin | null>(null)

type Props = {
  children: React.ReactNode
  admin: Admin | null
}

export const AdminProvider = ({ children, admin }: Props) => {
  return <AdminContext.Provider value={admin}>{children}</AdminContext.Provider>
}
