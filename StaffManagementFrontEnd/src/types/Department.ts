export interface Department{
    departmentID ?: number,
    departmentName : string
}
export interface DepartmentWithEmployees extends Department {
  employeeNames: string[]
}
export interface DepartmentWrite{
  departmentID ?: number,
  departmentName: string
}