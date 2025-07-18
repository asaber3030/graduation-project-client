export const adminRoutes = {
  auth: {
    login: "/administrators/login",
    logout: "/administrators/logout"
  },
  dashboard: {
    root: "/administrators"
  },
  hospitals: {
    root: "/administrators/hospitals",
    create: "/administrators/hospitals/create",
    update: (hospitalId: number) => `/administrators/hospitals/${hospitalId}/update`,
    view: (hospitalId: number) => `/administrators/hospitals/${hospitalId}`,
    employees: (hospitalId: number) => `/administrators/hospitals/${hospitalId}/employees`,
    inventories: (hospitalId: number) => `/administrators/hospitals/${hospitalId}/inventories`,
    departments: (hospitalId: number) => `/administrators/hospitals/${hospitalId}/departments`,
    prescriptions: (hospitalId: number) => `/administrators/hospitals/${hospitalId}/prescriptions`
  },

  admins: {
    root: "/administrators/admins",
    create: "/administrators/admins/create",
    update: (patientId: number) => `/administrators/admins/${patientId}/update`,
    view: (patientId: number) => `/administrators/admins/${patientId}`
  },

  permissions: {
    root: "/administrators/permissions",
    create: "/administrators/permissions/create",
    update: (groupId: number) => `/administrators/permissions/${groupId}/update`,
    view: (groupId: number) => `/administrators/permissions/${groupId}`,
    viewPermission: (groupId: number, permissionId: number) =>
      `/administrators/permissions/${groupId}/permissions/${permissionId}`
  },

  patients: {
    root: "/administrators/patients",
    create: "/administrators/patients/create",
    update: (patientId: number) => `/administrators/patients/${patientId}/update`,
    view: (patientId: number) => `/administrators/patients/${patientId}`,
    patientPrescriptions: (patientId: number) =>
      `/administrators/patients/${patientId}/prescriptions`,
    patientMedications: (patientId: number) => `/administrators/patients/${patientId}/medications`,
    patientVaccinations: (patientId: number) =>
      `/administrators/patients/${patientId}/vaccinations`,
    patientInvoices: (patientId: number) => `/administrators/patients/${patientId}/invoices`
  },

  doctors: {
    root: "/administrators/doctors",
    create: "/administrators/doctors/create",
    update: (patientId: number) => `/administrators/doctors/${patientId}/update`,
    view: (patientId: number) => `/administrators/doctors/${patientId}`,
    doctorPrescriptions: (doctorId: number) => `/administrators/doctors/${doctorId}/prescriptions`,
    doctorMedications: (doctorId: number) => `/administrators/doctors/${doctorId}/medications`,
    doctorVaccinations: (doctorId: number) => `/administrators/doctors/${doctorId}/vaccinations`,
    doctorInvoices: (doctorId: number) => `/administrators/doctors/${doctorId}/invoices`,
    doctorLoginHistory: (doctorId: number) => `/administrators/doctors/${doctorId}/login-history`
  },
  medicine: {
    root: "/administrators/medicine",
    create: "/administrators/medicine/create",
    update: (medicine: number) => `/administrators/medicine/${medicine}/update`,
    view: (medicine: number) => `/administrators/medicine/${medicine}`
  },
  employees: {
    root: "/administrators/employees",
    create: "/administrators/employees/create",
    update: (employeeId: number) => `/administrators/employees/${employeeId}/update`,
    view: (employeeId: number) => `/administrators/employees/${employeeId}`,
    employeePrescriptions: (employeeId: number) =>
      `/administrators/employees/${employeeId}/prescriptions`,
    employeePermissions: (employeeId: number) =>
      `/administrators/employees/${employeeId}/permissions`,
    employeeLogs: (employeeId: number) => `/administrators/employees/${employeeId}/logs`
  },
  departments: {
    root: "/administrators/departments",

    create: "/administrators/departments/create",

    update: (departmentId: number) => `/administrators/departments/${departmentId}/update`,

    view: (departmentId: number) => `/administrators/departments/${departmentId}`,
    departmentInventories: (departmentId: number) =>
      `/administrators/departments/${departmentId}/inventories`,
    departmentDoctors: (departmentId: number) =>
      `/administrators/departments/${departmentId}/doctors`,
    departmentExaminationForms: (departmentId: number) =>
      `/administrators/departments/${departmentId}/examination-forms`,
    departmentEmployees: (departmentId: number) =>
      `/administrators/departments/${departmentId}/employees`
  },
  inventories: {
    root: "/administrators/inventories",
    create: "/administrators/inventories/create",
    update: (inventoryId: number) => `/administrators/inventories/${inventoryId}/update`,
    view: (inventoryId: number) => `/administrators/inventories/${inventoryId}`
  },
  prescriptions: {
    root: "/administrators/prescriptions",
    create: "/administrators/prescriptions/create",
    update: (prescriptionId: number) => `/administrators/prescriptions/${prescriptionId}/update`,
    view: (prescriptionId: number) => `/administrators/prescriptions/${prescriptionId}`,
    createPrescrptionItem: (prescriptionId: number) =>
      `/administrators/prescriptions/${prescriptionId}/create-item`,

    updatePrescrptionItem: (prescriptionId: number) =>
      `/administrators/prescriptions/${prescriptionId}/items/${prescriptionId}`
  }
}
