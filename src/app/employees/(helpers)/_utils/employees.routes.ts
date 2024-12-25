export const employeesRoutes = {
  auth: {
    login: "/employees/login",
    logout: "/employees/logout"
  },
  dashboard: {
    root: "/employees"
  },
  hospitals: {
    root: "/employees/hospitals",
    create: "/employees/hospitals/create",
    update: (hospitalId: number) => `/employees/hospitals/${hospitalId}/update`,
    view: (hospitalId: number) => `/employees/hospitals/${hospitalId}`,
    employees: (hospitalId: number) => `/employees/hospitals/${hospitalId}/employees`,
    inventories: (hospitalId: number) => `/employees/hospitals/${hospitalId}/inventories`,
    departments: (hospitalId: number) => `/employees/hospitals/${hospitalId}/departments`,
    prescriptions: (hospitalId: number) => `/employees/hospitals/${hospitalId}/prescriptions`
  },

  admins: {
    root: "/employees/admins",
    create: "/employees/admins/create",
    update: (patientId: number) => `/employees/admins/${patientId}/update`,
    view: (patientId: number) => `/employees/admins/${patientId}`
  },

  permissions: {
    root: "/employees/permissions",
    create: "/employees/permissions/create",
    update: (groupId: number) => `/employees/permissions/${groupId}/update`,
    view: (groupId: number) => `/employees/permissions/${groupId}`,
    viewPermission: (groupId: number, permissionId: number) =>
      `/employees/permissions/${groupId}/permissions/${permissionId}`
  },

  patients: {
    root: "/employees/patients",
    create: "/employees/patients/create",
    update: (patientId: number) => `/employees/patients/${patientId}/update`,
    view: (patientId: number) => `/employees/patients/${patientId}`,
    patientPrescriptions: (patientId: number) => `/employees/patients/${patientId}/prescriptions`,
    patientMedications: (patientId: number) => `/employees/patients/${patientId}/medications`,
    patientVaccinations: (patientId: number) => `/employees/patients/${patientId}/vaccinations`,
    patientInvoices: (patientId: number) => `/employees/patients/${patientId}/invoices`
  },

  doctors: {
    root: "/employees/doctors",
    create: "/employees/doctors/create",
    update: (patientId: number) => `/employees/doctors/${patientId}/update`,
    view: (patientId: number) => `/employees/doctors/${patientId}`,
    doctorPrescriptions: (doctorId: number) => `/employees/doctors/${doctorId}/prescriptions`,
    doctorMedications: (doctorId: number) => `/employees/doctors/${doctorId}/medications`,
    doctorVaccinations: (doctorId: number) => `/employees/doctors/${doctorId}/vaccinations`,
    doctorInvoices: (doctorId: number) => `/employees/doctors/${doctorId}/invoices`,
    doctorLoginHistory: (doctorId: number) => `/employees/doctors/${doctorId}/login-history`
  },
  medicine: {
    root: "/employees/medicine",
    create: "/employees/medicine/create",
    update: (medicine: number) => `/employees/medicine/${medicine}/update`,
    view: (medicine: number) => `/employees/medicine/${medicine}`
  },
  employees: {
    root: "/employees/employees",
    create: "/employees/employees/create",
    update: (employeeId: number) => `/employees/employees/${employeeId}/update`,
    view: (employeeId: number) => `/employees/employees/${employeeId}`,
    employeePrescriptions: (employeeId: number) =>
      `/employees/employees/${employeeId}/prescriptions`,
    employeePermissions: (employeeId: number) => `/employees/employees/${employeeId}/permissions`,
    employeeLogs: (employeeId: number) => `/employees/employees/${employeeId}/logs`
  },
  departments: {
    root: "/employees/departments",

    create: "/employees/departments/create",

    update: (departmentId: number) => `/employees/departments/${departmentId}/update`,

    view: (departmentId: number) => `/employees/departments/${departmentId}`,
    departmentInventories: (departmentId: number) =>
      `/employees/departments/${departmentId}/inventories`,
    departmentDoctors: (departmentId: number) => `/employees/departments/${departmentId}/doctors`,
    departmentExaminationForms: (departmentId: number) =>
      `/employees/departments/${departmentId}/examination-forms`,
    departmentEmployees: (departmentId: number) =>
      `/employees/departments/${departmentId}/employees`
  },
  inventories: {
    root: "/employees/inventories",
    create: "/employees/inventories/create",
    update: (inventoryId: number) => `/employees/inventories/${inventoryId}/update`,
    view: (inventoryId: number) => `/employees/inventories/${inventoryId}`
  },
  prescriptions: {
    root: "/employees/prescriptions",
    create: "/employees/prescriptions/create",
    update: (prescriptionId: number) => `/employees/prescriptions/${prescriptionId}/update`,
    view: (prescriptionId: number) => `/employees/prescriptions/${prescriptionId}`,
    createPrescrptionItem: (prescriptionId: number) =>
      `/employees/prescriptions/${prescriptionId}/create-item`,

    updatePrescrptionItem: (prescriptionId: number) =>
      `/employees/prescriptions/${prescriptionId}/items/${prescriptionId}`
  }
}
