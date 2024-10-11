export const adminRoutes = {
  auth: {
    login: "/administrators/login",
    logout: "/administrators/logout",
  },
  dashboard: {
    root: "/administrators",
  },
  hospitals: {
    root: "/administrators/hospitals",
    create: "/administrators/hospitals/create",
    update: (hospitalId: number) => `/administrators/hospitals/${hospitalId}/update`,
    view: (hospitalId: number) => `/administrators/hospitals/${hospitalId}`,
  },
  patients: {
    root: "/administrators/patients",
    create: "/administrators/users/create",
    edit: "/administrators/users/edit",
  },
  doctors: {
    root: "/administrators/doctors",
    create: "/administrators/doctors/create",
    edit: "/administrators/doctors/edit",
  },
  medicine: {
    root: "/administrators/medicine",
    create: "/administrators/medicine/create",
    edit: "/administrators/medicine/edit",
  },
  employees: {
    root: "/administrators/employees",
    create: "/administrators/employees/create",
    edit: "/administrators/employees/edit",
  },
  departments: {
    root: "/administrators/departments",
    create: "/administrators/departments/create",
    update: (hospitalId: number) => `/administrators/departments/${hospitalId}/update`,
  },
  inventories: {
    root: "/administrators/inventories",
    create: "/administrators/inventories/create",
    edit: "/administrators/inventories/edit",
  },
  prescriptions: {
    root: "/administrators/prescriptions",
    create: "/administrators/prescriptions/create",
    edit: "/administrators/prescriptions/edit",
  },
}
