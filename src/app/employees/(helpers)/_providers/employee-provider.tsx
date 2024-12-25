"use client"

import { Admin, Employee } from "@prisma/client"
import { createContext } from "react"

export const EmployeeContext = createContext<Employee | null>(null)

type Props = {
  children: React.ReactNode
  employee: Employee | null
}

export const EmployeeProvider = ({ children, employee }: Props) => {
  return <EmployeeContext.Provider value={employee}>{children}</EmployeeContext.Provider>
}
