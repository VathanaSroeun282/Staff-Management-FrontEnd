export interface LeaveRequest{
    LeaveRequestID ?: number,
    LeaveType : string,
    StartDate : Date,
    EndDate : Date,
    Reason : string,
    Status : string,
    EmployeeID : number
}