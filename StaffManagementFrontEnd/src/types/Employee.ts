export interface Employee {
          employeeID: number,
          firstName: string,
          lastName: string,
          dateOfBirth: string,
          position: string,
          hireDate: string,
          salary: string,
          email: string,
          phoneNumber: string,
          status: string,
          departmentName: string,
          roleName: string,
          attendanceCount: number | null,
          performanceReviewCount: number | null,
          auditLogCount: number | null,
          leaveRequestCount: number | null
}

export interface EmployeeUpdate {
    employeeID: number,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    position: string,
    hireDate: string,
    salary: number,
    email: string,
    phoneNumber: string,
    status: string,
    departmentID: string,
    roleName: string,
    attendanceCount: number,
    performanceReviewCount: number,
    auditLogCount: number,
    leaveRequestCount: number
}
export interface EmployeeWrite {
  // employeeID?: number
  firstName: string
  lastName: string
  dateOfBirth: string
  position: string
  hireDate: string
  salary: number
  email: string
  phoneNumber: string
  status: string
  departmentID: number | null
  roleID: number | null
}
