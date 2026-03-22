export interface Department{
    departmentID ?: number,
    departmentName : string
}
export interface DepartmentWithEmployees extends Department {
  employeeNames: string[]
}