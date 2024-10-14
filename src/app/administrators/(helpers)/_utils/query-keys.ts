export const adminQueryKeys = {
  medicine: {
    search: (search?: string) => ["admin", "medicine", search],
  },
  departments: {
    search: (search?: string) => ["admin", "departments", search],
  },
  doctors: {
    search: (search?: string) => ["admin", "doctors", search],
  },
  patients: {
    search: (search?: string) => ["admin", "patients", search],
  },
  inventories: {
    search: (search?: string) => ["admin", "inventories", search],
  },
}
