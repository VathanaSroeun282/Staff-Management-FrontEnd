import { createRouter, createWebHistory } from 'vue-router'
import StaffList from '@/views/StaffList.vue'
import DepartmentList from '@/views/DepartmentList.vue'
import StaffForm from '@/views/StaffForm.vue'
import DepartmentForm from '@/views/DepartmentForm.vue'
import AttendanceList from '@/views/AttendanceList.vue'
import AttendanceForm from '@/views/AttendanceForm.vue'
import AuditLogManage from '@/views/AuditLogManage.vue'
import AuditLogForm from '@/views/AuditLogForm.vue'
import LeaveRequestManange from '@/views/LeaveRequestManange.vue'
import LeaveRequestForm from '@/views/LeaveRequestForm.vue'
import RoleManage from '@/views/RoleManage.vue'
import RoleForm from '@/views/RoleForm.vue'
import PerformanceReviewManage from '@/views/PerformanceReviewManage.vue'
import PerformanceReviewForm from '@/views/PerformanceReviewForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //Staff
    { path: '/', name: 'staff-list', component: StaffList },
    { path: '/staff/create', name: 'staff-create', component: StaffForm },
    { path: '/staff/edit/:id',name: 'staff-edit', component: StaffForm, props: true },

    //Department
    { path: '/departments', name: 'department-list',component: DepartmentList },
    { path: '/department/create', name: 'department-create', component: DepartmentForm },
    { path: '/department/edit/:id', name: 'department-edit', component: DepartmentForm, props: true },

    //Attendance
    { path: '/attendances', name: 'attendance-list',component: AttendanceList },
    { path: '/attendance/create', name: 'attendance-create', component: AttendanceForm },
    { path: '/attendance/edit/:id', name: 'attendance-edit', component: AttendanceForm, props: true },

    //Audit-Log
    { path: '/auditLogs', name: 'audit-log-list', component: AuditLogManage },
    { path: '/auditLog/create', name: 'audit-log-create', component: AuditLogForm },
    { path: '/auditLog/edit/:id', name: 'audit-log-edit', component: AuditLogForm, props: true },

    //Leave-Request
    { path: '/leaverequests', name: 'leave-request-list', component: LeaveRequestManange },
    { path: '/leaverequest/create', name: 'leave-request-create', component: LeaveRequestForm },
    { path: '/leaverequest/edit/:id', name: 'leave-request-edit', component: LeaveRequestForm, props: true },
  
    //Role
    { path: '/roles', name: 'role-list', component: RoleManage },
    { path: '/role/create', name: 'role-create', component: RoleForm },
    { path: '/role/edit/:id', name: 'role-edit', component: RoleForm, props: true },

    //Performance Review
    { path: '/Performances', name: 'performance-list', component: PerformanceReviewManage },
    { path: '/Performance/create', name: 'performance-create', component: PerformanceReviewForm },
    { path: '/Performance/edit/:id', name: 'performance-edit', component: PerformanceReviewForm, props: true },

    //When choose the wrong page, it will redirect to the root page
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ],
})

export default router