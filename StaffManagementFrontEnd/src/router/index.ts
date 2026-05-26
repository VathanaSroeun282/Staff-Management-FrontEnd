import { createRouter, createWebHistory } from 'vue-router'
import StaffList from '@/views/StaffList.vue'
import DepartmentList from '@/views/DepartmentList.vue'
import StaffForm from '@/views/StaffForm.vue'
import DepartmentForm from '@/views/DepartmentForm.vue'
import AttendanceList from '@/views/AttendanceList.vue'
import AttendanceForm from '@/views/AttendanceForm.vue'
import AuditLogManage from '@/views/AuditLogManage.vue'
import AuditLogForm from '@/views/AuditLogForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: StaffList},
    { path: '/staff/create', component: StaffForm },
    { path: '/staff/edit/:id', component: StaffForm },

    { path: '/departments', component: DepartmentList},
    { path: '/departments/create', component: DepartmentForm },
    { path: '/departments/edit/:id', component: DepartmentForm },

    { path: '/attendances',component: AttendanceList },
    { path: '/attendances/create', component: AttendanceForm },
    { path: '/attendances/edit/:id', component: AttendanceForm },

    { 
      path: '/auditLogs', 
      name: 'audit-log-list',
      component: AuditLogManage 
    },
    { 
      path: '/auditLogs/create', 
      name: 'audit-log-create',
      component: AuditLogForm 
    },
    { 
      path: '/auditLogs/edit/:id', 
      name: 'audit-log-edit',
      component: AuditLogForm,
      props: true 
    },

    //When choose the wrong page, it will redirect to the root page
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
})

export default router