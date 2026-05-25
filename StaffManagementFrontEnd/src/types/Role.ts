export interface Role{
    roleID? : number,
    roleName : string
}

export interface RoleWithEmployees extends Role{
    employeeName ?: string[]
}