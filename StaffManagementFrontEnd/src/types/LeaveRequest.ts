export interface LeaveRequest{
    leaveRequestID: number,
    leaveType: string,
    startDate: string,
    endDate: string,
    reason: string,
    status: string,
    employeeID: number,
    employeeName: string
}