"use client"

import { Admin } from "@prisma/client"
import { createContext } from "react"

export const AdminContext = createContext<Admin | {}>({})

type Props = {
  children: React.ReactNode
  admin: Admin | {}
}

export const AdminProvider = ({ children, admin }: Props) => {
  return <AdminContext.Provider value={admin}>{children}</AdminContext.Provider>
}
