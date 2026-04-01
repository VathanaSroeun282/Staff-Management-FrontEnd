//ALLS END POINTS
export const AttendanceAPI = "http://localhost:5016/api/Attendance";
export const AuditLogAPI = "http://localhost:5016/api/AuditLog";
export const DepartmentAPI = "http://localhost:5016/api/Department";
export const EmployeeAPI = "http://localhost:5016/api/Employee";
export const LeaveRequestAPI = "http://localhost:5016/api/LeaveRequest";
export const PerformanceReviewAPI = "http://localhost:5016/api/PerformanceReview";
export const RoleAPI = "http://localhost:5016/api/Role";

//Attendance
/*
--Get All Attendances
curl -X 'GET' \
  'http://localhost:5016/api/Attendance' \
  -H 'accept: *//*'

--Create New
curl -X 'POST' \
  'http://localhost:5016/api/Attendance' \
  -H 'accept: *//*' \
  -H 'Content-Type: application/json' \
  -d '{
  "clockInTime": "2026-01-03T13:20:47.023Z",
  "clockOutTime": "2026-01-03T13:20:47.023Z",
  "employeeID": 0
}'

--Get By ID:
curl -X 'GET' \
  'http://localhost:5016/api/Attendance/2' \
  -H 'accept: *//*'

--Delete 
curl -X 'DELETE' \
  'http://localhost:5016/api/Attendance/1' \
  -H 'accept: *//*'

--Update
curl -X 'PUT' \
  'http://localhost:5016/api/Attendance/1' \
  -H 'accept: *//*' \
  -H 'Content-Type: application/json' \
  -d '{
  "clockInTime": "2026-01-03T13:23:30.354Z",
  "clockOutTime": "2026-01-03T13:23:30.354Z"
}
*/

//AuditLog
/*
--Get all audit logs
curl -X 'GET' \
  'http://localhost:5016/api/AuditLog' \
  -H 'accept: *//*'

--New Audit Log
curl -X 'POST' \
  'http://localhost:5016/api/AuditLog' \
  -H 'accept: *//*' \
  -H 'Content-Type: application/json' \
  -d '{
  "changeType": "string",
  "changeDate": "2026-01-03T13:26:25.700Z",
  "changedBy": 0,
  "employeeID": 0
}'

--Get a audit logs
curl -X 'GET' \
  'http://localhost:5016/api/AuditLog/1' \
  -H 'accept: *//*'

--Delete a audit logs
curl -X 'DELETE' \
  'http://localhost:5016/api/AuditLog/1' \
  -H 'accept: *//*'
*/


//Department
/*
--Get All Departments
curl -X 'GET' \
  'http://localhost:5016/api/Department' \
  -H 'accept: *//*'

--Add New Department
curl -X 'POST' \
  'http://localhost:5016/api/Department' \
  -H 'accept: *//*' \
  -H 'Content-Type: application/json' \
  -d '{
  "departmentName": "string"
}'

--Update Department
curl -X 'PUT' \
  'http://localhost:5016/api/Department' \
  -H 'accept: *//*' \
  -H 'Content-Type: application/json' \
  -d '{
  "departmentID": 0,
  "departmentName": "string"
}'


--Get a department By ID
curl -X 'GET' \
  'http://localhost:5016/api/Department/1' \
  -H 'accept: *//*'

--Delete a department By ID
curl -X 'DELETE' \
  'http://localhost:5016/api/Department/1' \
  -H 'accept: *//*'
*/



//Employee
/*

--Get All Employees
curl -X 'GET' \
  'http://localhost:5016/api/Employee' \
  -H 'accept: *//*'

--New Employee
curl -X 'POST' \
  'http://localhost:5016/api/Employee' \
  -H 'accept: *//*' \
  -H 'Content-Type: application/json' \
  -d '{
  "firstName": "string",
  "lastName": "string",
  "dateOfBirth": "2026-01-03T13:38:11.732Z",
  "position": "string",
  "hireDate": "2026-01-03T13:38:11.732Z",
  "salary": 0,
  "email": "string",
  "phoneNumber": "string",
  "status": "string",
  "departmentID": 0,
  "roleID": 0
}'
--Get a Employee
curl -X 'GET' \
  'http://localhost:5016/api/Employee/1' \
  -H 'accept: *

--Delete a Employee
curl -X 'DELETE' \
  'http://localhost:5016/api/Employee/1' \
  -H 'accept: *//*'
*/



//LeaveRequest
/*

--Get all Leave Request
curl -X 'GET' \
  'http://localhost:5016/api/LeaveRequest' \
  -H 'accept: *//*'

--New Leave Request
curl -X 'POST' \
  'http://localhost:5016/api/LeaveRequest' \
  -H 'accept: *//*' \
  -H 'Content-Type: application/json' \
  -d '{
  "leaveType": "string",
  "startDate": "2026-01-03T13:41:41.504Z",
  "endDate": "2026-01-03T13:41:41.504Z",
  "reason": "string",
  "employeeID": 0
}'

--Get a Leave Request
curl -X 'GET' \
  'http://localhost:5016/api/LeaveRequest/1' \
  -H 'accept: *//*'

--Delete a Leave Requet
curl -X 'DELETE' \
  'http://localhost:5016/api/LeaveRequest/1' \
  -H 'accept: *//*'
*/



//PerformanceReview
/*
--Get all PerformanceReviews
curl -X 'GET' \
  'http://localhost:5016/api/PerformanceReview' \
  -H 'accept: *//*'
--Create new PerformanceReviews
curl -X 'POST' \
  'http://localhost:5016/api/PerformanceReview' \
  -H 'accept: *//*' \
  -H 'Content-Type: application/json' \
  -d '{
  "reviewDate": "2026-01-03T13:57:51.274Z",
  "rating": 0,
  "comments": "string",
  "employeeID": 0
}'
--Get a Performance Reviews
curl -X 'GET' \
  'http://localhost:5016/api/PerformanceReview/1' \
  -H 'accept: *//*'

--Delete a Performance Reivews
curl -X 'DELETE' \
  'http://localhost:5016/api/PerformanceReview/1' \
  -H 'accept: *//*'
*/



//Role
/*
--Get all Roles
curl -X 'GET' \
  'http://localhost:5016/api/Role' \
  -H 'accept: *//*'
--New Role
curl -X 'POST' \
  'http://localhost:5016/api/Role' \
  -H 'accept: *//*' \
  -H 'Content-Type: application/json' \
  -d '{
  "roleName": "string"
}'

--Get a Role
curl -X 'GET' \
  'http://localhost:5016/api/Role/1' \
  -H 'accept: *//*'

--Delete a Role
curl -X 'DELETE' \
  'http://localhost:5016/api/Role/1' \
  -H 'accept: *//*'
*/

