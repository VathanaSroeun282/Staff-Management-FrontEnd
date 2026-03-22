export interface Employee {
          //   <th class="border px-4 py-2">ID</th>
          // <th class="border px-4 py-2">Name</th>
          // <th class="border px-4 py-2">Date of Birth</th>
          // <th class="border px-4 py-2">Phone</th>
          // <th class="border px-4 py-2">Email</th>
          // <th class="border px-4 py-2">Position</th>
          // <th class="border px-4 py-2">Date Hired</th>
          // <th class="border px-4 py-2">Status</th>
          // <th class="border px-4 py-2">Department</th>
          // <th class="border px-4 py-2">Actions</th>
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
