export const adminQueryKeys = {
  medicine: {
    search: (search?: string) => ["admin", "medicine", search],
  },
  departments: {
    search: (search?: string) => ["admin", "departments", search],
  },
}
