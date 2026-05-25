<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Staff List</h1>
    <router-link to="/staff/create" class="px-4 py-2 rounded bg-green-200 hover:bg-green-700 mb-4 inline-block">
      ➕ Add Staff
    </router-link>
    <table class="table-auto w-full border border-gray-300">
      <thead>
        <tr class="bg-gray-200">
          <th class="border px-2 py-1">ID</th>
          <th class="border px-2 py-1">Name</th>
          <th class="border px-2 py-1">Date of Birth</th>
          <th class="border px-2 py-1">Phone</th>
          <th class="border px-2 py-1">Email</th>
          <th class="border px-2 py-1">Position</th>
          <th class="border px-2 py-1">Role</th>
          <th class="border px-2 py-1">Date Hired</th>
          <th class="border px-2 py-1">Status</th>
          <th class="border px-2 py-1">Department</th>
          <th class="border px-2 py-1">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="staff in staffs" :key="staff.employeeID">
          <td class="border px-2 py-1">{{ staff.employeeID }}</td>
          <td class="border px-2 py-1">{{ staff.firstName + " " + staff.lastName }}</td>
          <td class="border px-2 py-1">{{ formatDate(staff.dateOfBirth) }}</td>
          <td class="border px-2 py-1">{{ staff.phoneNumber }}</td>
          <td class="border px-2 py-1">{{ staff.email }}</td>
          <td class="border px-2 py-1">{{ staff.position }}</td>
          <td class="border px-2 py-1">{{ staff.roleName }}</td>
          <td class="border px-2 py-1">{{ formatDate(staff.hireDate) }}</td>
          <td class="border px-2 py-1">{{ staff.status }}</td>
          <td class="border px-2 py-1">{{ staff.departmentName }}</td>
          <td class="border px-2 py-1">
            <router-link :to="`/staff/edit/${staff.employeeID}`" class="text-blue-600 hover:underline">Edit</router-link>
            <button @click="deleteStaff(staff.employeeID)" class="text-red-600 hover:underline ml-4">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import axios from 'axios'
import type { Employee } from '@/types/Employee'
import type { DepartmentWithEmployees } from '@/types/Department'
import { EmployeeAPI, DepartmentAPI, RoleAPI } from '@/end points/EndPointLinks'
import type { RoleWithEmployees } from '@/types/Role'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const staffs = ref<Employee[]>([])
    const departments = ref<DepartmentWithEmployees[]>([]);
    const roles = ref<RoleWithEmployees[]>([]);
    const route = useRoute()
    const router = useRouter()
    const isEdit = ref(false)

    const fetchDepartments = async () => {
      const res = await axios.get<DepartmentWithEmployees[]>(DepartmentAPI)
      departments.value = res.data
    }
    const fetchRoles = async () => {
      const res = await axios.get<RoleWithEmployees[]>(RoleAPI)
      roles.value = res.data
    }
    const fetchStaffs = async () => {
      const res = await axios.get<Employee[]>(EmployeeAPI)
      staffs.value = res.data
    }

    const formatDate = (dateString: string): string => {
      const date = new Date(dateString)
      return date.toLocaleDateString()
    }

    const deleteStaff = async (id: number) => {
      if (confirm('Are you sure you want to delete this staff member?')) {
        await axios.delete(`${EmployeeAPI}/${id}`)
        const empName = staffs.value.find(s=> s.employeeID === id);
        // ✅ Remove from UI instantly (no reload)
        staffs.value = staffs.value.filter(s => s.employeeID !== id)

        alert("Staff "+ empName?.firstName + " " + empName?.lastName  +" removed successfully!")
      }
    }

    onMounted(async () => {
      await Promise.all([fetchDepartments(), fetchRoles(), fetchStaffs()])
    })

    return {
      staffs,
      formatDate,
      deleteStaff
    }
  },
})
</script>