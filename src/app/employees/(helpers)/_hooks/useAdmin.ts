import { useContext } from "react"
import { AdminContext } from "../_providers/employee-provider"
import { Admin } from "@prisma/client"

export function useAdmin() {
  const admin = useContext(AdminContext)
  return admin as Admin
}
