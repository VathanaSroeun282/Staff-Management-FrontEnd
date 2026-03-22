import { createRouter, createWebHistory } from 'vue-router'
import StaffList from '@/views/StaffList.vue'
import DepartmentList from '@/views/DepartmentList.vue'
import StaffForm from '@/views/StaffForm.vue'
import DepartmentForm from '@/views/DepartmentForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: StaffList},
    { path: '/departments', component: DepartmentList},
    { path: '/staff/create', component: StaffForm },
    { path: '/staff/edit/:id', component: StaffForm },
    { path: '/departments/create', component: DepartmentForm },
    { path: '/departments/edit/:id', component: DepartmentForm },
  ],
})

export default router
