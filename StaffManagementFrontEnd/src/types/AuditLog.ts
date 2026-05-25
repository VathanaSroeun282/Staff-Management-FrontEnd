export interface AuditLog{
    auditLogID : number,
    changeType : string,
    changeDate : string,
    changedBy : number,
    employeeName : string
}
/*
		"auditLogID": 7,
		"changeType": "Delete",
		"changeDate": "2025-02-07T08:50:00",
		"changedBy": 7,
		"employeeName": "David Lee"
*/
export interface AuditLog{
    AuditLogID ?: number,
    ChangeType : string,
    ChangeDate : Date,
    ChangBy : string,
    EmployeeID : number
}