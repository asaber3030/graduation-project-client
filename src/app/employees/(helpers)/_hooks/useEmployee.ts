import { useContext } from "react"
import { Employee } from "@prisma/client"
import { EmployeeContext } from "../_providers/employee-provider"

export function useEmployee() {
  const employee = useContext(EmployeeContext)
  return employee as Employee
}
