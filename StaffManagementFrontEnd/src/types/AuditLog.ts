export interface AuditLog{
    AuditLogID ?: number,
    ChangeType : string,
    ChangeDate : Date,
    ChangBy : string,
    EmployeeID : number
}